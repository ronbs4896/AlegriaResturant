import { createContext, useContext, useState, useCallback, lazy, Suspense } from 'react'

const LeadModal = lazy(() => import('../components/lead/LeadModal.jsx'))

const LeadModalContext = createContext(null)

export function LeadModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [preselect, setPreselect] = useState(null)

  const openLead = useCallback((serviceKey = null) => {
    setPreselect(serviceKey)
    setOpen(true)
  }, [])

  const closeLead = useCallback(() => setOpen(false), [])

  return (
    <LeadModalContext.Provider value={{ open, openLead, closeLead, preselect }}>
      {children}
      {open && (
        <Suspense fallback={null}>
          <LeadModal />
        </Suspense>
      )}
    </LeadModalContext.Provider>
  )
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext)
  if (!ctx) throw new Error('useLeadModal must be used within LeadModalProvider')
  return ctx
}
