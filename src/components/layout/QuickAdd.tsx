import { Modal } from '@/components/ui/Modal'
import { TransactionForm } from '@/components/forms/TransactionForm'
import { useUI } from '@/store/useUI'
import { useToast } from '@/hooks/useToast'
import { useStore } from '@/store/useStore'
import { useT } from '@/hooks/useT'

export function QuickAdd() {
  const open = useUI((s) => s.quickAddOpen)
  const setOpen = useUI((s) => s.setQuickAdd)
  const { toast } = useToast()
  const undo = useStore((s) => s.undo)
  const t = useT()

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title={t('tx.quickAdd')}
      description={t('tx.quickAddSub')}
      size="md"
    >
      <TransactionForm
        onDone={() => {
          setOpen(false)
          toast({
            title: t('tx.added'),
            description: '+10 XP',
            tone: 'success',
            action: { label: t('common.undo'), onClick: undo },
          })
        }}
      />
    </Modal>
  )
}
