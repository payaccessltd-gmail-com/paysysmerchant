import {RxDashboard} from 'react-icons/rx'
import { Image } from '../../../assets';

// const { role } = Storage.getItem("userDetails") || {};

export const MenuItems: any[] = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/inventory/dashboard',
        subMenuItems: [],
        icon: <RxDashboard className='m-auto text-secondary text-[25px]' />,
        roles: ""
    },
    {
        id: 2,
        name: 'Inventory',
        route: '/inventory/inventory',
        subMenuItems: [],
        icon: <img src={Image.transaction} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_TRANSACTION"
    },
    {
        id: 3,
        name: 'Reports',
        route: '/inventory/reports',
        subMenuItems: [
            // { name: 'End of Day Report', route: '/reports/eod', role: "VIEW_TRANSACTION" },
            // { name: 'Reconciliation', route: '/reports/reconciliation' }
        ],
        icon: <img src={Image.report} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_TRANSACTION"
    },
    {
        id: 4,
        name: 'Suppliers',
        route: '/inventory/suppliers',
        subMenuItems: [
            // { name: 'End of Day Report', route: '/reports/eod', role: "VIEW_TRANSACTION" },
            // { name: 'Reconciliation', route: '/reports/reconciliation' }
        ],
        icon: <img src={Image.recipients} alt="Recipients" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_TRANSACTION"
    },
    {
        id: 4,
        name: 'Order',
        route: '/inventory/order',
        subMenuItems: [
            // { name: 'End of Day Report', route: '/reports/eod', role: "VIEW_TRANSACTION" },
            // { name: 'Reconciliation', route: '/reports/reconciliation' }
        ],
        icon: <img src={Image.recipients} alt="Recipients" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_TRANSACTION"
    },
   
    {
        id: 4,
        name: 'Manage Store',
        route: '/inventory/manage-store',
        subMenuItems: [
            // { name: 'End of Day Report', route: '/reports/eod', role: "VIEW_TRANSACTION" },
            // { name: 'Reconciliation', route: '/reports/reconciliation' }
        ],
        icon: <img src={Image.recipients} alt="Recipients" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_TRANSACTION"
    },
   
]
