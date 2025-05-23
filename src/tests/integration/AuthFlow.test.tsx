import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { render, mockApiResponse, createMockStore } from '@/utils/testUtils'
import { LoginForm } from '@/components/auth/LoginForm'
import { apiService } from '@/services/api/apiService'

// Mock API service
jest.mock('@/services/api/apiService', () => ({
  apiService: {
    post: jest.fn(),
    get: jest.fn(),
  },
}))

describe('Authentication Flow Integration', () => {
  const mockApiService = apiService as jest.Mocked<typeof apiService>

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock successful login response
    mockApiService.post.mockImplementation(() =>
      mockApiResponse({
        data: {
          user: {
            id: '1',
            username: 'testuser',
            email: 'test@example.com',
            role: 'user',
          },
          tokens: {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
          },
        },
        success: true,
        status: 200,
      }),
    )
  })

  it('should complete full authentication flow', async () => {
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={onSubmit} />)

    // Fill form
    const emailInput = screen.getByLabelText(/e-posta/i)
    const passwordInput = screen.getByLabelText(/şifre/i)
    const submitButton = screen.getByRole('button', { name: /giriş yap/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    // Submit form
    fireEvent.click(submitButton)

    // Wait for API call
    await waitFor(() => {
      expect(mockApiService.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      })
    })

    // Check success state
    await waitFor(() => {
      expect(screen.getByText(/hoş geldiniz/i)).toBeInTheDocument()
    })
  })

  it('should handle authentication errors', async () => {
    mockApiService.post.mockRejectedValue(new Error('Invalid credentials'))

    render(<LoginForm onSubmit={() => {}} />)

    const emailInput = screen.getByLabelText(/e-posta/i)
    const passwordInput = screen.getByLabelText(/şifre/i)
    const submitButton = screen.getByRole('button', { name: /giriş yap/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/giriş başarısız/i)).toBeInTheDocument()
    })
  })

  it('should maintain session state across components', async () => {
    const store = createMockStore({
      user: {
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          role: 'user',
        },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      },
    })

    render(<LoginForm onSubmit={() => {}} />, { store })

    expect(screen.getByText(/hoş geldiniz/i)).toBeInTheDocument()
    expect(screen.getByText(/hoş geldiniz/i)).toBeInTheDocument()
    expect(screen.getByText('testuser')).toBeInTheDocument()
  })
})
