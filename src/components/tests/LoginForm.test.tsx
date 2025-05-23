import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { render, mockAuthState, createMockStore } from '@/utils/testUtils'
import { LoginForm } from '../auth/LoginForm'

// Mock the auth hook
const mockUseAuth = jest.fn()
jest.mock('@/hooks/useAuth', () => ({
  useAuth: mockUseAuth,
}))

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      isLoading: false,
      isAuthenticated: false,
      user: null,
    })
  })

  it('should render login form correctly', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)

    expect(screen.getByText('Giriş Yap')).toBeInTheDocument()
    expect(screen.getByLabelText(/e-posta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/şifre/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /giriş yap/i })).toBeInTheDocument()
  })

  it('should validate required fields', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', { name: /giriş yap/i })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/bu alan zorunludur/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should validate email format', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByLabelText(/e-posta/i)
    const submitButton = screen.getByRole('button', { name: /giriş yap/i })

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/geçerli bir e-posta adresi girin/i)).toBeInTheDocument()
    })
  })

  it('should submit form with valid data', async () => {
    const mockLogin = jest.fn().mockResolvedValue(mockAuthState.user)

    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      isAuthenticated: false,
      user: null,
    })

    render(<LoginForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByLabelText(/e-posta/i)
    const passwordInput = screen.getByLabelText(/şifre/i)
    const submitButton = screen.getByRole('button', { name: /giriş yap/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      })
    })
  })
  it('should show success state when authenticated', async () => {
    const store = createMockStore({
      user: mockAuthState,
    })

    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      isLoading: false,
      isAuthenticated: true,
      user: mockAuthState.user,
    })

    render(<LoginForm onSubmit={mockOnSubmit} />, { store })

    expect(screen.getByText(/hoş geldiniz/i)).toBeInTheDocument()
    expect(screen.getByText(mockAuthState.user.name)).toBeInTheDocument()
  })

  it('should disable form during loading', async () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      isLoading: true,
      isAuthenticated: false,
      user: null,
    })

    render(<LoginForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByLabelText(/e-posta/i)
    const passwordInput = screen.getByLabelText(/şifre/i)
    const submitButton = screen.getByRole('button')

    expect(emailInput).toHaveAttribute('disabled')
    expect(passwordInput).toHaveAttribute('disabled')
    expect(submitButton).toHaveAttribute('disabled')
  })
})
