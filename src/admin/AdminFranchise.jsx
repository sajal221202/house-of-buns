import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { waLink } from '../utils/whatsapp'

export default function AdminFranchise() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      setError('Supabase is not configured.')
      return undefined
    }

    let cancelled = false

    async function load() {
      const { data, error: err } = await supabase
        .from('franchise_enquiries')
        .select('*')
        .order('created_at', { ascending: false })
      if (cancelled) return
      if (err) setError(err.message)
      else setLeads(data || [])
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel('franchise-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'franchise_enquiries' }, (payload) => {
        setLeads((prev) => {
          if (payload.eventType === 'DELETE') return prev.filter((l) => l.id !== payload.old.id)
          const updated = payload.new
          const exists = prev.some((l) => l.id === updated.id)
          return exists ? prev.map((l) => (l.id === updated.id ? updated : l)) : [updated, ...prev]
        })
      })
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [])

  async function updateStatus(id, status) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    if (supabase) {
      const { error: err } = await supabase.from('franchise_enquiries').update({ status }).eq('id', id)
      if (err) console.error('Failed to update lead status', err)
    }
  }

  return (
    <div className="admin-franchise">
      <section className="admin-panel">
        <h2>Franchise Enquiries ({leads.length})</h2>
        {loading ? (
          <p className="admin-empty">Loading…</p>
        ) : error ? (
          <p className="admin-empty">{error}</p>
        ) : leads.length === 0 ? (
          <p className="admin-empty">No enquiries yet.</p>
        ) : (
          <div className="admin-lead-list">
            {leads.map((lead) => (
              <div className="admin-lead-card" key={lead.id}>
                <div className="admin-lead-main">
                  <span className="admin-lead-name">{lead.name}</span>
                  <span className="admin-lead-city">{lead.city}</span>
                </div>
                <div className="admin-lead-details">
                  <span>📞 {lead.phone}</span>
                  <span>💰 {lead.budget || 'Not specified'}</span>
                  <span>{new Date(lead.created_at).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="admin-lead-actions">
                  <a
                    className="admin-order-whatsapp"
                    href={waLink(lead.phone, `Hi ${lead.name}, thanks for your interest in a House of Buns franchise!`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 WhatsApp
                  </a>
                  <select value={lead.status || 'new'} onChange={(e) => updateStatus(lead.id, e.target.value)}>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
