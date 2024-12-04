import React from 'react'

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-4 overflow-y-auto'>
      {children}
    </div>
  )
}

