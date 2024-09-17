import React from 'react'
import DashboardLayout from '../../components/dashboard/Index'
import RecipientsTable from './components/RecipientsTable'

const Recipients = () => {
  return (
    <DashboardLayout>
        <div className="flex justify-between items-center">
        <p className="grid gap-[20px] text-[16px] font-semibold mt-[20px]">
          Recipients
        </p>
      </div>
      <RecipientsTable/>
    </DashboardLayout>
  )
}

export default Recipients