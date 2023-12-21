import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Todo | Dashboard',
  description: 'Manage Your Task With Ease',
}

export default function DashboardLayout({children}:any) {
  return (
   <div className='dashboard-container'>
{children}
   </div>
  )
}
