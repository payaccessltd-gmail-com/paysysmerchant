import Overlay from '../../components/reusables/Overlay/Overlay'

const PolicyModal = ({toggleDropdown,isOpen}:any) => {
  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
        <div className="grid gap-[20px] md:w-[60vw] lg:w-[50vw]">
<p className="font-bold text-[20px]">Data Deletion and Retention Policy</p>
<p className="font-bold text-[20px]">Data Deleted:</p>
<ul className="list-disc list-inside grid gap-2">
        <li className=""><span className="font-bold">Personal Information: </span>Your full name, contact details, and any other personal data stored within your account will be permanently deleted from our systems.
</li>
        <li className=""><span className="font-bold">Account Information:</span>All transaction history, account balances, and related financial data will be erased.</li>
      </ul>

      <p className="font-bold text-[20px]">Data Retained:</p>
<ul className="list-disc list-inside grid gap-2">
        <li className=""><span className="font-bold">Legal Compliance: </span>Certain data may be retained for a period of 10 years to comply with legal obligations, such as transaction records and tax-related information.
</li>
        <li className=""><span className="font-bold">Anonymous Data:</span>Non-identifiable data may be kept for statistical and analytical purposes.
</li>
      </ul>
      <p className="font-bold text-[20px]">Data Retained:</p>
      <p className="">Data required for legal purposes will be retained for a period of 10 years, after which it will be securely deleted.
</p>

        </div>
    </Overlay>
  )
}

export default PolicyModal