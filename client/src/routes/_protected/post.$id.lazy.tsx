import { Center } from '@mantine/core'
import { createLazyFileRoute } from '@tanstack/react-router'
import { PostDetailsScreen } from '../../components/post-details/PostDetailsScreen'

export const Route = createLazyFileRoute('/_protected/post/$id')({
  component: () => <PostDetailsScreen />,
})