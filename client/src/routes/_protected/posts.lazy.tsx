import { createLazyFileRoute } from '@tanstack/react-router'
import { PostsScreen } from '../../components/posts/PostsScreen'

export const Route = createLazyFileRoute('/_protected/posts')({
  component: () => <PostsScreen />
})