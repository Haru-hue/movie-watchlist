import { usePreviousRoute } from '@/hooks/useRouteHistory'
import HistoryLayout from '@/layouts/historyLayout'

function history() {
    const { history } = usePreviousRoute()
    
    return <HistoryLayout movies={history}/>
}

export default history