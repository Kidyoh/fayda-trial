'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiUrl } from '@/apiConfig';

interface PaymentData {
  student_name: string;
  amount: number;
  item_count: number;
}

interface PaymentResponse {
  status: 'loading' | 'pending' | 'completed' | 'failed' | 'error';
  data?: PaymentData;
  error?: string;
}

export default function VerifyPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<PaymentResponse>({ status: 'loading' });
  const [isPolling, setIsPolling] = useState(false);

  const tx_ref = searchParams.get('tx_ref');

  useEffect(() => {
    if (!tx_ref || !tx_ref.startsWith('bulk-')) {
      setPaymentStatus({ status: 'error', error: 'Invalid transaction reference' });
      setTimeout(() => router.push('/courses'), 5000);
      return;
    }

    // Initial check
    checkPaymentStatus();

    // Start polling if pending
    const interval = setInterval(() => {
      if (paymentStatus.status === 'pending') {
        checkPaymentStatus();
      }
    }, 3000);

    // Timeout after 5 minutes
    const timeout = setTimeout(() => {
      setPaymentStatus({ status: 'error', error: 'Payment verification timeout' });
      setIsPolling(false);
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [tx_ref, paymentStatus.status]);

  const checkPaymentStatus = async () => {
    try {
      const response = await fetch(`${apiUrl}/inforeciver/payment-status/${tx_ref}`);
      if (!response.ok) {
        if (response.status === 400) {
          setPaymentStatus({ status: 'error', error: 'Invalid transaction reference' });
        } else if (response.status === 404) {
          setPaymentStatus({ status: 'error', error: 'Transaction not found' });
        } else {
          setPaymentStatus({ status: 'error', error: 'Server error' });
        }
        return;
      }

      const data = await response.json();
      setPaymentStatus({ status: data.status, data: data.data });

      if (data.status === 'completed' || data.status === 'failed') {
        setIsPolling(false);
      } else if (data.status === 'pending') {
        setIsPolling(true);
      }
    } catch (error) {
      setPaymentStatus({ status: 'error', error: 'Network error' });
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const renderContent = () => {
    switch (paymentStatus.status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Verifying payment...</p>
          </div>
        );

      case 'pending':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4">Payment is being processed...</p>
            <p className="text-sm text-gray-600">Checking status every 3 seconds</p>
          </div>
        );

      case 'completed':
        return (
          <div className="text-center">
            <div className="text-green-600 text-2xl mb-4">✓</div>
            <h2 className="text-xl font-bold mb-4">Payment Successful!</h2>
            {paymentStatus.data && (
              <div className="mb-4">
                <p>Student: {paymentStatus.data.student_name}</p>
                <p>Amount: ${paymentStatus.data.amount}</p>
                <p>Items: {paymentStatus.data.item_count}</p>
              </div>
            )}
            <div className="space-x-4">
              <button
                onClick={() => handleNavigate('/courses')}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Go to Courses
              </button>
              <button
                onClick={() => handleNavigate('/dashboard')}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="text-center">
            <div className="text-red-600 text-2xl mb-4">✗</div>
            <h2 className="text-xl font-bold mb-4">Payment Failed</h2>
            <p className="mb-4">Your payment could not be processed.</p>
            <div className="space-x-4">
              <button
                onClick={() => handleNavigate('/cart')}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Back to Cart
              </button>
              <button
                onClick={() => handleNavigate('/support')}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Contact Support
              </button>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <div className="text-red-600 text-2xl mb-4">!</div>
            <h2 className="text-xl font-bold mb-4">Error</h2>
            <p className="mb-4">{paymentStatus.error}</p>
            <div className="space-x-4">
              <button
                onClick={handleRetry}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Retry
              </button>
              <button
                onClick={() => handleNavigate('/support')}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Contact Support
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Payment Verification</h1>
        {renderContent()}
      </div>
    </div>
  );
}