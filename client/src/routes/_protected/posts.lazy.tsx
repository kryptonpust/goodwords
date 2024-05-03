import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/posts')({
  component: () => <div>Hello /_protected/!</div>
})