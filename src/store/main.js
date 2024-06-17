import { create } from 'zustand'

export const useStore = create((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),

  // client info
  rutClient: null,
  setRutClient: (rut) => set({ rutClient: rut }),

  // document to pay
  docToPay: {
    total: 0,
    documents: []
  },
  updateDocumentsToPay: (selectedDocuments, tableId) =>
    set((state) => {
      // Mantén los documentos seleccionados por tabla
      const newSelectionByTable = {
        ...state.docToPay.selectionByTable,
        [tableId]: selectedDocuments
      }

      // Combina todas las selecciones de todas las tablas
      const combinedDocuments = Object.values(newSelectionByTable).flat()

      // Elimina duplicados
      const uniqueDocuments = Array.from(
        new Set(combinedDocuments.map((doc) => doc.id))
      ).map((id) => combinedDocuments.find((doc) => doc.id === id))

      const total = uniqueDocuments.reduce(
        (acc, doc) => acc + parseFloat(doc.amount),
        0
      )

      return {
        docToPay: {
          total,
          documents: uniqueDocuments,
          selectionByTable: newSelectionByTable
        }
      }
    }),

  // pay status
  paymentStatus: null,
  setPaymentStatus: (status) => set({ paymentStatus: status })
}))
