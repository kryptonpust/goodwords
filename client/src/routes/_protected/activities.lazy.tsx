import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/activities')({
  component: () => <div>activity</div>
})