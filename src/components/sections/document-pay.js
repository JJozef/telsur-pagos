import { DATA_TEST } from '@/data-test/data'
import { formatCurrency } from '@/lib/format-currency'
import { Badge } from '@/components/ui/badge'
import { DataTableDocuments } from '@/components/tables/table-documents'
import { useStore } from '@/store/main'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

const DocumentToPay = () => {
  const { docToPay } = useStore()

  const disabledItem = (dataItem) => {
    if (!dataItem.length) return false

    return dataItem.some((item) => {
      return docToPay.documents.some((doc) => doc.id === item.id)
    })
  }

  return (
    <>
      <div className='mb-3 text-center sm:text-left'>
        <h2 className='text-2xl font-bold text-primary/80 select-none'>
          Tus productos
        </h2>
        <p className='text-sm text-pretty text-muted-foreground mb-3'>
          Selecciona los documentos que deseas pagar y haz clic en siguiente
          cuando estés listo.
        </p>
      </div>
      <Accordion
        type='multiple'
        collapsible='true'
        className='w-full border-0 space-y-1'
      >
        {DATA_TEST.map((b, index) => (
          <AccordionItem
            className='border-0'
            value={`item-${index}`}
            key={index}
          >
            <AccordionTrigger
              className='px-2 bg-secondary rounded-md overflow-hidden hover:bg-secondary/40 hover:no-underline gap-2'
              disabled={disabledItem(b.data)}
            >
              <div className='flex items-center justify-between gap-3 w-full select-none truncate'>
                <span className='text-left truncate'>{b.address}</span>
                <Badge>{formatCurrency(b.total)}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className='py-3'>
              <DataTableDocuments data={b.data} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

export { DocumentToPay }
