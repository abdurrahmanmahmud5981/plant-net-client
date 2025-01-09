/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment } from 'react'
import Button from '../Shared/Button/Button'

const PurchaseModal = ({ closeModal, isOpen,plant }) => {
    const {
    name,
    image,
    price,
    quantity,
    category,
    description,
    seller: { name: sallerName, image: sallerImage },
  } = plant || {};
  // Total Price Calculation

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Plant: Money Plant</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Category: Indoor</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Customer: PH</p>
                </div>

                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Price: $ 120</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Available Quantity: 5</p>
                </div>
                {/* quantity input field */}
                <div className='mt-2 space-x-2'>
                  <label htmlFor='quantity' className=' text-gray-600'>
                    Quantity
                  </label>
                  <input
                    max={3}
                    min={1}
                    className=' p-2 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                    name='quantity'
                    id='quantity'
                    type='number'
                    placeholder='Enter Quantity'
                    required
                  />
                </div>
                {/* address input filde */}
                <div className='mt-2'>
                  <label htmlFor='address' className='block text-gray-600'>
                    Address
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                    name='address'
                    id='address'
                    type='text'
                    placeholder='Enter Address'
                    required
                  />
                </div>
                {/* Purchase Button */}
                <div className="mt-4">
                <Button label={'Purchase'}/>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PurchaseModal
