import { createLazyFileRoute } from '@tanstack/react-router'
import { ActivitiesScreen } from '../../components/activity/ActivitesScreen'

export const Route = createLazyFileRoute('/_protected/activities')({
  component: () => <ActivitiesScreen/>
})