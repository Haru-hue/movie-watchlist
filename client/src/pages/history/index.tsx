import HistoryLayout from '@/layouts/historyLayout'

function history() {
    let history = []
    if (typeof window !== 'undefined') {
        history = JSON.parse(window.sessionStorage.getItem('navigationHistory') || '[]')
    }
    return <HistoryLayout movies={history}/>
}

export default history
