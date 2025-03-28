import {RxDashboard} from 'react-icons/rx'
import { Image } from '../../assets';

// const { role } = Storage.getItem("userDetails") || {};

export const financialMenuItems: any[] = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard',
        subMenuItems: [],
        icon: <RxDashboard className='m-auto text-secondary text-[25px]' />,
        roles: ""
    },{
        id: 2,
        name: 'Transaction',
        route: '/transaction',
        subMenuItems: [],
        icon: <img src={Image.transaction} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_TRANSACTION"
    },
    {
        id: 3,
        name: 'Reports',
        route: '/reports/eod',
        subMenuItems: [
            // { name: 'End of Day Report', route: '/reports/eod', role: "VIEW_TRANSACTION" },
            // { name: 'Reconciliation', route: '/reports/reconciliation' }
        ],
        icon: <img src={Image.report} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_TRANSACTION"
    },
    {
        id: 4,
        name: 'Recipients',
        route: '/recipients',
        subMenuItems: [
            // { name: 'End of Day Report', route: '/reports/eod', role: "VIEW_TRANSACTION" },
            // { name: 'Reconciliation', route: '/reports/reconciliation' }
        ],
        icon: <img src={Image.recipients} alt="Recipients" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_TRANSACTION"
    },
   
    
]

export const paymentMenuItems:any[]=[
    {
        id: 1,
        name: 'Airtime/Data',
        route: '/airtime',
        subMenuItems: [
            // { name: 'Branch management', route: '/branches' },
            // { name: 'Terminal management', route: '/terminals' },
            // { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.personalcard} alt="airtime" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_USER"
    },{
        id: 2,
        name: 'Bills',
        route: '/bills',
        subMenuItems: [
            // { name: 'Branch management', route: '/branches' },
            // { name: 'Terminal management', route: '/terminals' },
            // { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.bill} alt="Bills" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_USER"
    },{
        id: 3,
        name: 'Withdrawal',
        route: '/withdrawal',
        subMenuItems: [],
        icon: <img src={Image.withdraw} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: ""
    },
]
export const BulkPayment:any[]=[
    {
        id: 4,
        name: 'Bulk Payment',
        route: '/bulk-payment',
        subMenuItems: [],
        icon: <img src={Image.loan} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: ""
    },
   
    {
        id: 2,
        name: 'Beneficiary List',
        route: '/beneficiary-list',
        subMenuItems: [
             { name: 'Branch management', route: '/branches' },
             { name: 'Terminal management', route: '/terminals' },
             { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.bill} alt="Bills" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_USER"
    },
    {
        id: 3,
        name: 'History',
        route: '/bulk-history',
        subMenuItems: [
            // { name: 'Branch management', route: '/branches' },
            // { name: 'Terminal management', route: '/terminals' },
            // { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.recipients} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_USER"
    },
]
export const transactionsMenuItems:any[]=[
    {
        id: 1,
        name: 'Payment Link',
        route: '/payment-link',
        subMenuItems: [
            // { name: 'Branch management', route: '/branches' },
            // { name: 'Terminal management', route: '/terminals' },
            // { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.paymentlink} alt="airtime" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_USER"
    },{
        id: 2,
        name: 'Split/Skill',
        route: '/split',
        subMenuItems: [
            // { name: 'Branch management', route: '/branches' },
            // { name: 'Terminal management', route: '/terminals' },
            // { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.bill} alt="Bills" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_USER"
    },{
        id: 3,
        name: 'Invoice',
        route: '/invoice',
        subMenuItems: [],
        icon: <img src={Image.invoice} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: ""
    }
]

export const managerMenuItems: any[] = [
    {
        id: 1,
        name: 'Users',
        route: '/users',
        subMenuItems: [
            // { name: 'Branch management', route: '/branches' },
            // { name: 'Terminal management', route: '/terminals' },
            // { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.user} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_USER"
    },
    {
        id: 2,
        name: 'Customers',
        route: '/customers',
        subMenuItems: [
            // { name: 'Branch management', route: '/branches' },
            // { name: 'Terminal management', route: '/terminals' },
            // { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.recipients} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_USER"
    },
    {
        id: 3,
        name: 'Branches',
        route: '/branches',
        subMenuItems: [
            // { name: 'Branch management', route: '/branches' },
            // { name: 'Terminal management', route: '/terminals' },
            // { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.building} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_BRANCH"
    },
    {   
        id: 4,
        name: 'Terminal',
        route: '/terminals',
        subMenuItems: [
            // { name: 'Branch management', route: '/branches' },
            // { name: 'Terminal management', route: '/terminals' },
            // { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.cardPos} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_TERMINAL"
    },
    {
        id: 5,
        name: 'settings',
        route:'/settings',
        subMenuItems: [
        ],
        icon: <img src={Image.setting} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_TRANSACTION"
    },
]

export const developerMenuItems: any[] = [
    {
        id: 1,
        name: 'Developer Tools',
        route: '/developer-tools',
        subMenuItems: [
            // { name: 'Branch management', route: '/branches' },
            // { name: 'Terminal management', route: '/terminals' },
            // { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.developer} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_USER"
    }
   
]



export const   InventoryMenuItems: any[] = [
    {
        id: 1,
        name: 'Inventory',
        route: '#',
        // route: '/inventory/dashboard',
        subMenuItems: [
            // { name: 'Branch management', route: '/branches' },
            // { name: 'Terminal management', route: '/terminals' },
            // { name: 'View Admin Users', route: '/users' },
        ],
        icon:  <img src={Image.developer} alt="transaction" className='m-auto text-white text-[25px]' />,
        roles: "VIEW_USER"
    }
   
]


// export const userRoles = role;

// export const finalMenu = (role: any): any[] => {

//     let items = topMenuItems;//.map((each: any) => { return { ...each, subMenuItems: each.subMenuItems.filter((e: any) => role?.permissionSet?.find((one: { permissionName: any }) => one.permissionName == e.role) || e.role == "") } })
//     return items.filter(e => role?.permissionSet?.find((one: { permissionName: any }) => one.permissionName == e.roles) || e.roles == "")
// }