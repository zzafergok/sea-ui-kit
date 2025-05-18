import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import * as react_hook_form from 'react-hook-form';
import { FieldValues, UseFormReturn, SubmitHandler, FieldPath, ControllerProps, UseFormProps } from 'react-hook-form';
import * as RadixToast from '@radix-ui/react-toast';
import * as RadixDialog from '@radix-ui/react-dialog';
import * as RadixSelect from '@radix-ui/react-select';
import * as RadixSwitch from '@radix-ui/react-switch';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import { VariantProps } from 'class-variance-authority';
import { z } from 'zod';
import * as _reduxjs_toolkit from '@reduxjs/toolkit';
import * as redux_thunk from 'redux-thunk';
import * as redux from 'redux';
import * as _reduxjs_toolkit_query from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook } from 'react-redux';
import { ClassValue } from 'clsx';
export { default as i18n } from 'i18next';

declare const seaBlueTheme: {
    colors: {
        primary50: string;
        primary100: string;
        primary200: string;
        primary300: string;
        primary400: string;
        primary500: string;
        primary600: string;
        primary700: string;
        primary800: string;
        primary900: string;
        accent50: string;
        accent100: string;
        accent200: string;
        accent300: string;
        accent400: string;
        accent500: string;
        accent600: string;
        accent700: string;
        accent800: string;
        accent900: string;
        neutral50: string;
        neutral100: string;
        neutral200: string;
        neutral300: string;
        neutral400: string;
        neutral500: string;
        neutral600: string;
        neutral700: string;
        neutral800: string;
        neutral900: string;
        success: string;
        warning: string;
        error: string;
        info: string;
    };
    dark: {
        primary500: string;
        accent500: string;
        background: string;
        foreground: string;
    };
    light: {
        background: string;
        foreground: string;
    };
    fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
    };
    fontWeight: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
    };
    radius: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        full: string;
    };
    spacing: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        8: string;
        10: string;
        12: string;
        16: string;
        20: string;
        24: string;
        32: string;
        40: string;
        48: string;
        56: string;
        64: string;
    };
    shadow: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    animation: {
        fast: string;
        default: string;
        slow: string;
    };
};

declare const Tabs: React.ForwardRefExoticComponent<RadixTabs.TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TabsList: React.ForwardRefExoticComponent<Omit<RadixTabs.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React.ForwardRefExoticComponent<Omit<RadixTabs.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<Omit<RadixTabs.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Form: <TFieldValues extends FieldValues = FieldValues, TContext = any>({ children, className, form, onSubmit, ...htmlFormProps }: React.PropsWithChildren<{
    form: UseFormReturn<TFieldValues, TContext>;
    onSubmit: SubmitHandler<TFieldValues>;
    className?: string;
} & Omit<React.ComponentProps<"form">, "onSubmit">>) => React.JSX.Element;
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => React.JSX.Element;
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: react_hook_form.FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare const FormItem: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const FormLabel: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
} & React.RefAttributes<HTMLLabelElement>>;
declare const FormDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const FormMessage: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;

declare const ToastProvider: React.FC<RadixToast.ToastProviderProps>;
declare const ToastViewport: React.ForwardRefExoticComponent<Omit<RadixToast.ToastViewportProps & React.RefAttributes<HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
declare const Toast: React.ForwardRefExoticComponent<Omit<RadixToast.ToastProps & React.RefAttributes<HTMLLIElement>, "ref"> & React.RefAttributes<HTMLLIElement>>;
declare const ToastAction: React.ForwardRefExoticComponent<Omit<RadixToast.ToastActionProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastClose: React.ForwardRefExoticComponent<Omit<RadixToast.ToastCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastTitle: React.ForwardRefExoticComponent<Omit<RadixToast.ToastTitleProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ToastDescription: React.ForwardRefExoticComponent<Omit<RadixToast.ToastDescriptionProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Dialog: React.FC<RadixDialog.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<RadixDialog.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<RadixDialog.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
    displayName: string;
};
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<RadixDialog.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<RadixDialog.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

declare const Select: React.FC<RadixSelect.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<RadixSelect.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<RadixSelect.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React.ForwardRefExoticComponent<Omit<RadixSelect.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<RadixSelect.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<RadixSelect.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React.ForwardRefExoticComponent<Omit<RadixSelect.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<RadixSelect.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

declare const Switch: React.ForwardRefExoticComponent<Omit<RadixSwitch.SwitchProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

declare const Checkbox: React.ForwardRefExoticComponent<Omit<RadixCheckbox.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "secondary" | "outline" | "ghost" | "destructive" | null | undefined;
    size?: "sm" | "md" | "lg" | "icon" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'icon';
    variant?: 'default' | 'secondary' | 'outline' | 'ghost';
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    rememberMe: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
}, {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
}>;
declare const registerSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    terms: z.ZodLiteral<true>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: true;
}, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: true;
}>, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: true;
}, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: true;
}>;
declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
declare const resetPasswordSchema: z.ZodEffects<z.ZodObject<{
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    confirmPassword: string;
}, {
    password: string;
    confirmPassword: string;
}>, {
    password: string;
    confirmPassword: string;
}, {
    password: string;
    confirmPassword: string;
}>;
type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface LoginFormProps {
    onSubmit: (data: LoginFormValues) => void;
    isLoading?: boolean;
}
declare function LoginForm({ onSubmit, isLoading }: LoginFormProps): React.JSX.Element;

interface ThemeToggleProps {
    className?: string;
}
declare function ThemeToggle({ className }: ThemeToggleProps): React.JSX.Element;

interface LanguageToggleProps {
    className?: string;
}
declare function LanguageToggle({ className }: LanguageToggleProps): React.JSX.Element;

/**
 * Enhanced form hook that combines React Hook Form with Zod validation
 * and adds internationalization support for error messages
 */
declare function useForm<T extends z.ZodType<any, any>>(schema: T, options?: Omit<UseFormProps<z.infer<T>>, 'resolver'>): react_hook_form.UseFormReturn<z.TypeOf<T>, any, z.TypeOf<T>>;

interface LangState {
    currentLanguage: string;
    availableLanguages: string[];
}
declare const setLanguage: _reduxjs_toolkit.ActionCreatorWithPayload<string, "lang/setLanguage">;
declare const selectCurrentLanguage: (state: RootState) => string;
declare const selectAvailableLanguages: (state: RootState) => string[];

interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    role: string;
}
interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
declare const setUser: _reduxjs_toolkit.ActionCreatorWithPayload<User, "user/setUser">;
declare const logoutUser: _reduxjs_toolkit.ActionCreatorWithoutPayload<"user/logoutUser">;
declare const setLoading: _reduxjs_toolkit.ActionCreatorWithPayload<boolean, "user/setLoading">;
declare const setError: _reduxjs_toolkit.ActionCreatorWithPayload<string | null, "user/setError">;
declare const selectUser: (state: RootState) => User | null;
declare const selectIsAuthenticated: (state: RootState) => boolean;
declare const selectIsLoading: (state: RootState) => boolean;
declare const selectError: (state: RootState) => string | null;

declare const store: _reduxjs_toolkit.EnhancedStore<{
    theme: ThemeState;
    lang: LangState;
    user: UserState;
    api: _reduxjs_toolkit_query.CombinedState<{}, "User" | "Posts" | "Settings", "api">;
}, redux.UnknownAction, _reduxjs_toolkit.Tuple<[redux.StoreEnhancer<{
    dispatch: redux_thunk.ThunkDispatch<{
        theme: ThemeState;
        lang: LangState;
        user: UserState;
        api: _reduxjs_toolkit_query.CombinedState<{}, "User" | "Posts" | "Settings", "api">;
    }, undefined, redux.UnknownAction>;
}>, redux.StoreEnhancer]>>;
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
declare const useAppDispatch: () => redux_thunk.ThunkDispatch<{
    theme: ThemeState;
    lang: LangState;
    user: UserState;
    api: _reduxjs_toolkit_query.CombinedState<{}, "User" | "Posts" | "Settings", "api">;
}, undefined, redux.UnknownAction> & redux.Dispatch<redux.UnknownAction>;
declare const useAppSelector: TypedUseSelectorHook<RootState>;

type ThemeMode = 'light' | 'dark' | 'system';
interface ThemeState {
    mode: ThemeMode;
    systemPreference: 'light' | 'dark';
}
declare const setTheme: _reduxjs_toolkit.ActionCreatorWithPayload<ThemeMode, "theme/setTheme">;
declare const updateSystemPreference: _reduxjs_toolkit.ActionCreatorWithPayload<"dark" | "light", "theme/updateSystemPreference">;
declare const selectTheme: (state: RootState) => ThemeMode;
declare const selectEffectiveTheme: (state: RootState) => "dark" | "light";

/**
 * Hook for managing theme state and system preferences
 */
declare function useTheme(): {
    theme: "dark" | "light";
    setTheme: (theme: "light" | "dark" | "system") => {
        payload: ThemeMode;
        type: "theme/setTheme";
    };
};

/**
 * Combines class names with Tailwind CSS
 */
declare function cn(...inputs: ClassValue[]): string;
/**
 * Debounces a function
 */
declare function debounce<T extends (...args: any[]) => any>(fn: T, ms?: number): (...args: Parameters<T>) => void;
/**
 * Checks if the client is in dark mode
 */
declare function isDarkMode(): boolean;
/**
 * Gets a nested object property by a dot-notation path
 */
declare function get(obj: any, path: string, defaultValue?: any): any;
/**
 * Sanitizes HTML to prevent XSS attacks
 */
declare function sanitizeHtml(html: string): string;
/**
 * Formats a date for display
 */
declare function formatDate(date: Date | string, locale?: string): string;
/**
 * Type-safe LocalStorage access
 */
declare const storage: {
    get: <T>(key: string, defaultValue: T) => T;
    set: <T>(key: string, value: T) => void;
    remove: (key: string) => void;
};

export { AppDispatch, Button, Checkbox, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, ForgotPasswordFormValues, Form, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, LanguageToggle, LoginForm, LoginFormValues, RegisterFormValues, ResetPasswordFormValues, RootState, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, ThemeToggle, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, buttonVariants, cn, debounce, forgotPasswordSchema, formatDate, get, isDarkMode, loginSchema, logoutUser, registerSchema, resetPasswordSchema, sanitizeHtml, seaBlueTheme, selectAvailableLanguages, selectCurrentLanguage, selectEffectiveTheme, selectError, selectIsAuthenticated, selectIsLoading, selectTheme, selectUser, setError, setLanguage, setLoading, setTheme, setUser, storage, store, updateSystemPreference, useAppDispatch, useAppSelector, useForm, useFormField, useTheme };
