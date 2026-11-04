import { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { adminApi } from '../services/adminApi'

export default function Customers() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await adminApi.getEnquiries()
        const unique = {}
        data.enquiries.forEach(item => {
          if (!unique[item.email]) {
            unique[item.email] = {
              name: item.name,
              email: item.email,
              phone: item.phone || 'N/A',
              company: item.company || 'N/A',
              enquiryCount: 0,
            }
          }
          unique[item.email].enquiryCount += 1
        })
        setCustomers(Object.values(unique))
      } catch (error) {
        console.error(error)
      }
    }

    loadCustomers()
  }, [])

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Customer Management" />

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Enquiries</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.email}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.company}</td>
                  <td>{customer.enquiryCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
