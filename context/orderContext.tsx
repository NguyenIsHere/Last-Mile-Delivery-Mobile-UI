import React, { createContext, useState, useContext, ReactNode } from 'react'

// Định nghĩa kiểu cho Context
interface OrderContextProps {
  orderInfo: OrderInfo
  updateOrderInfo: (newOrderInfo: Partial<OrderInfo>) => void
}

// Định nghĩa kiểu cho orderInfo
interface OrderInfo {
  senderIn4: {
    address: string
    houseNumber: string
    name: string
    phone: string
    note: string
  }
  receiverIn4: {
    address: string
    houseNumber: string
    name: string
    phone: string
    note: string
  }
  deliveryMethod: string
  vehicleType: string
  itemDetails: {
    size: string
    weight: string
    type: string
    insurance: string
  }
}

// Định nghĩa kiểu cho Provider Props
interface OrderProviderProps {
  children: ReactNode
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined)

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    senderIn4: {
      address: '',
      houseNumber: '',
      name: '',
      phone: '',
      note: ''
    },
    receiverIn4: {
      address: '',
      houseNumber: '',
      name: '',
      phone: '',
      note: ''
    },
    deliveryMethod: '',
    vehicleType: '',
    itemDetails: {
      size: '',
      weight: '',
      type: '',
      insurance: ''
    }
  })

  const updateOrderInfo = (newOrderInfo: Partial<OrderInfo>) => {
    setOrderInfo(prev => ({
      ...prev,
      ...newOrderInfo
    }))
  }

  return (
    <OrderContext.Provider value={{ orderInfo, updateOrderInfo }}>
      {children}
    </OrderContext.Provider>
  )
}

// Hàm tiện ích để sử dụng context
export const useOrderContext = (): OrderContextProps => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider')
  }
  return context
}
