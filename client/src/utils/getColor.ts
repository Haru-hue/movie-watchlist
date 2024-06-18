export default function getColor (index: number): string {
    switch (index) {
        case 0:
            return 'text-[#DC5F6D]';
        case 1:
            return 'text-[#DBA158]';
        case 2:
            return 'text-[#A2D3C0]';
        default:
            return 'text-slate-600'
    }
}