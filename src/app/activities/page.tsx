import EnhancedCalendarView from '@/components/calendar'
import EnhancedTodaysActivities from '@/components/activities'

export default function Page (){
  return(
    <>
      <div className="grid md:grid-cols-2 gap-8">
        <EnhancedCalendarView/>
        <EnhancedTodaysActivities/>
      </div>
    </>
  )
}