'use strict';

var React5 = require('react');
var RadixTabs = require('@radix-ui/react-tabs');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var reactHookForm = require('react-hook-form');
var lucideReact = require('lucide-react');
var RadixToast = require('@radix-ui/react-toast');
var RadixDialog = require('@radix-ui/react-dialog');
var RadixSelect = require('@radix-ui/react-select');
var RadixSwitch = require('@radix-ui/react-switch');
var RadixCheckbox = require('@radix-ui/react-checkbox');
var classVarianceAuthority = require('class-variance-authority');
var reactI18next = require('react-i18next');
var zod = require('zod');
var zod$1 = require('@hookform/resolvers/zod');
var toolkit = require('@reduxjs/toolkit');
var reactRedux = require('react-redux');
var i18n = require('i18next');
var LanguageDetector = require('i18next-browser-languagedetector');
var react = require('@reduxjs/toolkit/query/react');
var axios = require('axios');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React5__default = /*#__PURE__*/_interopDefault(React5);
var RadixTabs__namespace = /*#__PURE__*/_interopNamespace(RadixTabs);
var RadixToast__namespace = /*#__PURE__*/_interopNamespace(RadixToast);
var RadixDialog__namespace = /*#__PURE__*/_interopNamespace(RadixDialog);
var RadixSelect__namespace = /*#__PURE__*/_interopNamespace(RadixSelect);
var RadixSwitch__namespace = /*#__PURE__*/_interopNamespace(RadixSwitch);
var RadixCheckbox__namespace = /*#__PURE__*/_interopNamespace(RadixCheckbox);
var i18n__default = /*#__PURE__*/_interopDefault(i18n);
var LanguageDetector__default = /*#__PURE__*/_interopDefault(LanguageDetector);
var axios__default = /*#__PURE__*/_interopDefault(axios);

/**
 * Sea UI Kit - Custom Radix UI Components
 * @license MIT
 */

// src/styles/theme.ts
var seaBlueTheme = {
  colors: {
    // Primary sea blues
    primary50: "hsl(200, 100%, 95%)",
    primary100: "hsl(200, 100%, 90%)",
    primary200: "hsl(200, 95%, 80%)",
    primary300: "hsl(200, 90%, 70%)",
    primary400: "hsl(200, 85%, 60%)",
    primary500: "hsl(200, 80%, 50%)",
    // Main sea blue
    primary600: "hsl(200, 85%, 40%)",
    primary700: "hsl(200, 90%, 30%)",
    primary800: "hsl(200, 95%, 20%)",
    primary900: "hsl(200, 100%, 10%)",
    // Complementary colors
    accent50: "hsl(180, 100%, 95%)",
    accent100: "hsl(180, 100%, 90%)",
    accent200: "hsl(180, 95%, 80%)",
    accent300: "hsl(180, 90%, 70%)",
    accent400: "hsl(180, 85%, 60%)",
    accent500: "hsl(180, 80%, 50%)",
    // Teal accent
    accent600: "hsl(180, 85%, 40%)",
    accent700: "hsl(180, 90%, 30%)",
    accent800: "hsl(180, 95%, 20%)",
    accent900: "hsl(180, 100%, 10%)",
    // Neutrals
    neutral50: "hsl(200, 10%, 98%)",
    neutral100: "hsl(200, 10%, 95%)",
    neutral200: "hsl(200, 10%, 90%)",
    neutral300: "hsl(200, 10%, 80%)",
    neutral400: "hsl(200, 10%, 70%)",
    neutral500: "hsl(200, 10%, 50%)",
    neutral600: "hsl(200, 10%, 40%)",
    neutral700: "hsl(200, 10%, 30%)",
    neutral800: "hsl(200, 10%, 20%)",
    neutral900: "hsl(200, 10%, 10%)",
    // Semantic colors
    success: "hsl(160, 80%, 45%)",
    warning: "hsl(40, 90%, 50%)",
    error: "hsl(350, 80%, 55%)",
    info: "hsl(220, 80%, 55%)"
  },
  // Dark mode adjustments
  dark: {
    primary500: "hsl(200, 70%, 45%)",
    accent500: "hsl(180, 70%, 45%)",
    background: "hsl(200, 20%, 10%)",
    foreground: "hsl(200, 10%, 95%)"
  },
  // Light mode
  light: {
    background: "hsl(200, 10%, 98%)",
    foreground: "hsl(200, 20%, 10%)"
  },
  // Font sizes
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem"
  },
  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  // Border radius
  radius: {
    sm: "0.125rem",
    md: "0.25rem",
    lg: "0.5rem",
    xl: "1rem",
    full: "9999px"
  },
  // Spacing
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
    40: "10rem",
    48: "12rem",
    56: "14rem",
    64: "16rem"
  },
  // Shadow
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  },
  // Animation
  animation: {
    fast: "0.15s ease-in-out",
    default: "0.25s ease-in-out",
    slow: "0.4s ease-in-out"
  }
};
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
function debounce(fn, ms = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}
function isDarkMode() {
  if (typeof window === "undefined")
    return false;
  return localStorage.getItem("theme") === "dark" || !localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function get(obj, path, defaultValue = void 0) {
  const travel = (regexp) => String.prototype.split.call(path, regexp).filter(Boolean).reduce((res, key) => res !== null && res !== void 0 ? res[key] : res, obj);
  const result = travel(/[,[\]]+?/) || travel(/[,.[\]]+?/);
  return result === void 0 || result === obj ? defaultValue : result;
}
function sanitizeHtml(html) {
  return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function formatDate(date, locale = "en-US") {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
var storage = {
  get: (key, defaultValue) => {
    if (typeof window === "undefined")
      return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error getting item from localStorage", error);
      return defaultValue;
    }
  },
  set: (key, value) => {
    if (typeof window === "undefined")
      return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in localStorage", error);
    }
  },
  remove: (key) => {
    if (typeof window === "undefined")
      return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage", error);
    }
  }
};

// src/components/Tabs/Tabs.tsx
var Tabs = RadixTabs__namespace.Root;
var TabsList = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixTabs__namespace.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 p-1 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
      className
    ),
    ...props
  }
));
TabsList.displayName = RadixTabs__namespace.List.displayName;
var TabsTrigger = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixTabs__namespace.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm dark:ring-offset-neutral-950 dark:focus-visible:ring-primary-600 dark:data-[state=active]:bg-neutral-950 dark:data-[state=active]:text-primary-500",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = RadixTabs__namespace.Trigger.displayName;
var TabsContent = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixTabs__namespace.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-primary-600",
      className
    ),
    ...props
  }
));
TabsContent.displayName = RadixTabs__namespace.Content.displayName;
var Form = ({
  children,
  className,
  form,
  onSubmit,
  ...htmlFormProps
}) => {
  return /* @__PURE__ */ React5__default.default.createElement(reactHookForm.FormProvider, { ...form }, /* @__PURE__ */ React5__default.default.createElement("form", { className: cn("space-y-6", className), onSubmit: form.handleSubmit(onSubmit), ...htmlFormProps }, children));
};
var FormFieldContext = React5__default.default.createContext({});
var FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ React5__default.default.createElement(FormFieldContext.Provider, { value: { name: props.name } }, /* @__PURE__ */ React5__default.default.createElement(reactHookForm.Controller, { ...props }));
};
var useFormField = () => {
  const fieldContext = React5__default.default.useContext(FormFieldContext);
  const itemContext = React5__default.default.useContext(FormItemContext);
  const { getFieldState, formState } = reactHookForm.useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
var FormItemContext = React5__default.default.createContext({});
var FormItem = React5__default.default.forwardRef(
  ({ className, ...props }, ref) => {
    const id = React5__default.default.useId();
    return /* @__PURE__ */ React5__default.default.createElement(FormItemContext.Provider, { value: { id } }, /* @__PURE__ */ React5__default.default.createElement("div", { ref, className: cn("space-y-2", className), ...props }));
  }
);
FormItem.displayName = "FormItem";
var FormLabel = React5__default.default.forwardRef(
  ({ className, required, children, ...props }, ref) => {
    const { formItemId } = useFormField();
    return /* @__PURE__ */ React5__default.default.createElement(
      "label",
      {
        ref,
        className: cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        ),
        htmlFor: formItemId,
        ...props
      },
      children,
      required && /* @__PURE__ */ React5__default.default.createElement("span", { className: "text-error ml-1" }, "*")
    );
  }
);
FormLabel.displayName = "FormLabel";
var FormDescription = React5__default.default.forwardRef(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return /* @__PURE__ */ React5__default.default.createElement(
      "p",
      {
        ref,
        id: formDescriptionId,
        className: cn("text-xs text-neutral-500 dark:text-neutral-400", className),
        ...props
      }
    );
  }
);
FormDescription.displayName = "FormDescription";
var FormMessage = React5__default.default.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error == null ? void 0 : error.message) : children;
    if (!body) {
      return null;
    }
    return /* @__PURE__ */ React5__default.default.createElement(
      "p",
      {
        ref,
        id: formMessageId,
        className: cn("text-xs font-medium text-error dark:text-error", className),
        ...props
      },
      body
    );
  }
);
FormMessage.displayName = "FormMessage";
var ToastProvider = RadixToast__namespace.Provider;
var ToastViewport = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixToast__namespace.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = RadixToast__namespace.Viewport.displayName;
var Toast = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixToast__namespace.Root,
  {
    ref,
    className: cn(
      "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-neutral-200 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full bg-white dark:border-neutral-800 dark:bg-neutral-950",
      className
    ),
    ...props
  }
));
Toast.displayName = RadixToast__namespace.Root.displayName;
var ToastAction = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixToast__namespace.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:ring-offset-neutral-950 dark:hover:bg-neutral-800 dark:focus:ring-primary-600",
      className
    ),
    ...props
  }
));
ToastAction.displayName = RadixToast__namespace.Action.displayName;
var ToastClose = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixToast__namespace.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-neutral-500 opacity-0 transition-opacity hover:text-neutral-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 dark:text-neutral-400 dark:hover:text-neutral-50",
      className
    ),
    "toast-close": "",
    ...props
  },
  /* @__PURE__ */ React5__default.default.createElement(lucideReact.X, { className: "h-4 w-4" })
));
ToastClose.displayName = RadixToast__namespace.Close.displayName;
var ToastTitle = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(RadixToast__namespace.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = RadixToast__namespace.Title.displayName;
var ToastDescription = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(RadixToast__namespace.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = RadixToast__namespace.Description.displayName;
var Dialog = RadixDialog__namespace.Root;
var DialogTrigger = RadixDialog__namespace.Trigger;
var DialogPortal = ({ className, children, ...props }) => /* @__PURE__ */ React5__default.default.createElement(RadixDialog__namespace.Portal, { ...props }, /* @__PURE__ */ React5__default.default.createElement("div", { className: cn("fixed inset-0 z-50 flex items-start justify-center sm:items-center", className) }, children));
DialogPortal.displayName = RadixDialog__namespace.Portal.displayName;
var DialogOverlay = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixDialog__namespace.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = RadixDialog__namespace.Overlay.displayName;
var DialogContent = React5__default.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(DialogPortal, null, /* @__PURE__ */ React5__default.default.createElement(DialogOverlay, null), /* @__PURE__ */ React5__default.default.createElement(
  RadixDialog__namespace.Content,
  {
    ref,
    className: cn(
      "fixed z-50 grid w-full gap-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
      "dark:border-neutral-800 dark:bg-neutral-950",
      className
    ),
    ...props
  },
  children,
  /* @__PURE__ */ React5__default.default.createElement(RadixDialog__namespace.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-primary-600 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400" }, /* @__PURE__ */ React5__default.default.createElement(lucideReact.X, { className: "h-4 w-4" }), /* @__PURE__ */ React5__default.default.createElement("span", { className: "sr-only" }, "Close"))
)));
DialogContent.displayName = RadixDialog__namespace.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ React5__default.default.createElement("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ React5__default.default.createElement("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixDialog__namespace.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight text-neutral-900 dark:text-neutral-50", className),
    ...props
  }
));
DialogTitle.displayName = RadixDialog__namespace.Title.displayName;
var DialogDescription = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixDialog__namespace.Description,
  {
    ref,
    className: cn("text-sm text-neutral-500 dark:text-neutral-400", className),
    ...props
  }
));
DialogDescription.displayName = RadixDialog__namespace.Description.displayName;
var Select = RadixSelect__namespace.Root;
var SelectGroup = RadixSelect__namespace.Group;
var SelectValue = RadixSelect__namespace.Value;
var SelectTrigger = React5__default.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixSelect__namespace.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-primary-600",
      className
    ),
    ...props
  },
  children,
  /* @__PURE__ */ React5__default.default.createElement(RadixSelect__namespace.Icon, { asChild: true }, /* @__PURE__ */ React5__default.default.createElement(lucideReact.ChevronDown, { className: "h-4 w-4 opacity-50" }))
));
SelectTrigger.displayName = RadixSelect__namespace.Trigger.displayName;
var SelectContent = React5__default.default.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(RadixSelect__namespace.Portal, null, /* @__PURE__ */ React5__default.default.createElement(
  RadixSelect__namespace.Content,
  {
    ref,
    className: cn(
      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-900 shadow-md animate-in fade-in-80 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
      position === "popper" && "translate-y-1",
      className
    ),
    position,
    ...props
  },
  /* @__PURE__ */ React5__default.default.createElement(RadixSelect__namespace.ScrollUpButton, { className: "flex items-center justify-center h-6 bg-white text-neutral-600 cursor-default dark:bg-neutral-950 dark:text-neutral-400" }, /* @__PURE__ */ React5__default.default.createElement(lucideReact.ChevronUp, { className: "h-4 w-4" })),
  /* @__PURE__ */ React5__default.default.createElement(
    RadixSelect__namespace.Viewport,
    {
      className: cn(
        "p-1",
        position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
      )
    },
    children
  ),
  /* @__PURE__ */ React5__default.default.createElement(RadixSelect__namespace.ScrollDownButton, { className: "flex items-center justify-center h-6 bg-white text-neutral-600 cursor-default dark:bg-neutral-950 dark:text-neutral-400" }, /* @__PURE__ */ React5__default.default.createElement(lucideReact.ChevronDown, { className: "h-4 w-4" }))
)));
SelectContent.displayName = RadixSelect__namespace.Content.displayName;
var SelectLabel = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixSelect__namespace.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100", className),
    ...props
  }
));
SelectLabel.displayName = RadixSelect__namespace.Label.displayName;
var SelectItem = React5__default.default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixSelect__namespace.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-primary-100 focus:text-primary-800 dark:focus:bg-primary-800 dark:focus:text-primary-100",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React5__default.default.createElement("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React5__default.default.createElement(RadixSelect__namespace.ItemIndicator, null, /* @__PURE__ */ React5__default.default.createElement(lucideReact.Check, { className: "h-4 w-4" }))),
  /* @__PURE__ */ React5__default.default.createElement(RadixSelect__namespace.ItemText, null, children)
));
SelectItem.displayName = RadixSelect__namespace.Item.displayName;
var SelectSeparator = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixSelect__namespace.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800", className),
    ...props
  }
));
SelectSeparator.displayName = RadixSelect__namespace.Separator.displayName;
var Input = React5__default.default.forwardRef(({ className, type, error, ...props }, ref) => {
  return /* @__PURE__ */ React5__default.default.createElement("div", { className: "relative w-full" }, /* @__PURE__ */ React5__default.default.createElement(
    "input",
    {
      type,
      className: cn(
        "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-primary-600",
        error && "border-error focus:ring-error",
        className
      ),
      ref,
      ...props
    }
  ), error && /* @__PURE__ */ React5__default.default.createElement("p", { className: "mt-1 text-xs text-error dark:text-error" }, error));
});
Input.displayName = "Input";
var Switch = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixSwitch__namespace.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-neutral-200 dark:data-[state=unchecked]:bg-neutral-700 dark:focus-visible:ring-primary-600 dark:data-[state=checked]:bg-primary-600",
      className
    ),
    ...props,
    ref
  },
  /* @__PURE__ */ React5__default.default.createElement(
    RadixSwitch__namespace.Thumb,
    {
      className: cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-neutral-50"
      )
    }
  )
));
Switch.displayName = RadixSwitch__namespace.Root.displayName;
var Textarea = React5__default.default.forwardRef(({ className, error, ...props }, ref) => {
  return /* @__PURE__ */ React5__default.default.createElement("div", { className: "relative w-full" }, /* @__PURE__ */ React5__default.default.createElement(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-primary-600",
        error && "border-error focus:ring-error",
        className
      ),
      ref,
      ...props
    }
  ), error && /* @__PURE__ */ React5__default.default.createElement("p", { className: "mt-1 text-xs text-error dark:text-error" }, error));
});
Textarea.displayName = "Textarea";
var Checkbox = React5__default.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5__default.default.createElement(
  RadixCheckbox__namespace.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-neutral-200 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:focus:ring-primary-600 data-[state=checked]:bg-primary-500 data-[state=checked]:text-white dark:data-[state=checked]:bg-primary-600",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React5__default.default.createElement(RadixCheckbox__namespace.Indicator, { className: "flex items-center justify-center text-current" }, /* @__PURE__ */ React5__default.default.createElement(lucideReact.Check, { className: "h-3 w-3" }))
));
Checkbox.displayName = RadixCheckbox__namespace.Root.displayName;
var buttonVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
        secondary: "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700",
        outline: "border border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100",
        ghost: "text-primary-500 hover:bg-primary-50 active:bg-primary-100 hover:text-primary-600",
        link: "text-primary-500 underline-offset-4 hover:underline hover:text-primary-600",
        destructive: "bg-error text-white hover:bg-red-600 active:bg-red-700"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false
    }
  }
);
var Button = React5.forwardRef(
  ({
    children,
    className,
    size = "md",
    asChild = false,
    disabled = false,
    fullWidth = false,
    variant = "default",
    ...props
  }, ref) => {
    return /* @__PURE__ */ React5__default.default.createElement("button", { ref, className: cn(buttonVariants({ variant, size, fullWidth, className })), ...props }, children);
  }
);
Button.displayName = "Button";
function useForm(schema, options) {
  const { t } = reactI18next.useTranslation();
  const resolver = zod$1.zodResolver(schema, {
    errorMap: (issue, ctx) => {
      let message = issue.message;
      switch (issue.code) {
        case zod.z.ZodIssueCode.invalid_type:
          if (issue.received === "undefined" || issue.received === "null") {
            message = t("validation.required");
          }
          break;
        case zod.z.ZodIssueCode.too_small:
          if (issue.type === "string") {
            message = t("validation.minLength", { min: issue.minimum });
          }
          break;
        case zod.z.ZodIssueCode.too_big:
          if (issue.type === "string") {
            message = t("validation.maxLength", { max: issue.maximum });
          }
          break;
        case zod.z.ZodIssueCode.invalid_string:
          if (issue.validation === "email") {
            message = t("validation.email");
          } else {
            message = t("validation.invalidFormat");
          }
          break;
      }
      return { message: message != null ? message : ctx.defaultError };
    }
  });
  return reactHookForm.useForm({
    resolver,
    ...options
  });
}
var loginSchema = zod.z.object({
  email: zod.z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: zod.z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: zod.z.boolean().optional()
});
var registerSchema = zod.z.object({
  name: zod.z.string().min(1, { message: "Name is required" }).min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be less than 50 characters" }),
  email: zod.z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: zod.z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter"
  }).regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter"
  }).regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: zod.z.string().min(1, { message: "Confirm password is required" }),
  terms: zod.z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" })
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
var forgotPasswordSchema = zod.z.object({
  email: zod.z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" })
});
var resetPasswordSchema = zod.z.object({
  password: zod.z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter"
  }).regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter"
  }).regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: zod.z.string().min(1, { message: "Confirm password is required" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

// src/components/auth/LoginForm.tsx
function LoginForm({ onSubmit, isLoading = false }) {
  const { t } = reactI18next.useTranslation();
  const form = useForm(loginSchema, {
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });
  return /* @__PURE__ */ React5__default.default.createElement(Form, { form, onSubmit, className: "space-y-6" }, /* @__PURE__ */ React5__default.default.createElement(
    FormField,
    {
      control: form.control,
      name: "email",
      render: ({ field }) => /* @__PURE__ */ React5__default.default.createElement(FormItem, null, /* @__PURE__ */ React5__default.default.createElement(FormLabel, { required: true }, t("auth.email")), /* @__PURE__ */ React5__default.default.createElement(Input, { type: "email", placeholder: "email@example.com", disabled: isLoading, ...field }), /* @__PURE__ */ React5__default.default.createElement(FormMessage, null))
    }
  ), /* @__PURE__ */ React5__default.default.createElement(
    FormField,
    {
      control: form.control,
      name: "password",
      render: ({ field }) => /* @__PURE__ */ React5__default.default.createElement(FormItem, null, /* @__PURE__ */ React5__default.default.createElement(FormLabel, { required: true }, t("auth.password")), /* @__PURE__ */ React5__default.default.createElement(Input, { type: "password", disabled: isLoading, ...field }), /* @__PURE__ */ React5__default.default.createElement(FormMessage, null))
    }
  ), /* @__PURE__ */ React5__default.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React5__default.default.createElement(
    FormField,
    {
      control: form.control,
      name: "rememberMe",
      render: ({ field }) => /* @__PURE__ */ React5__default.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React5__default.default.createElement(Checkbox, { id: "rememberMe", checked: field.value, onCheckedChange: field.onChange, disabled: isLoading }), /* @__PURE__ */ React5__default.default.createElement(
        "label",
        {
          htmlFor: "rememberMe",
          className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        },
        t("auth.rememberMe")
      ))
    }
  ), /* @__PURE__ */ React5__default.default.createElement(Button, { variant: "ghost", className: "px-0 text-sm", disabled: isLoading, type: "button" }, t("auth.forgotPassword"))), /* @__PURE__ */ React5__default.default.createElement(Button, { type: "submit", fullWidth: true, disabled: isLoading, className: "mt-6" }, isLoading ? t("components.button.loadingText") : t("auth.login")));
}
var initialState = {
  mode: "system",
  systemPreference: isDarkMode() ? "dark" : "light"
};
var themeSlice = toolkit.createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
    },
    updateSystemPreference: (state, action) => {
      state.systemPreference = action.payload;
    }
  }
});
var { setTheme, updateSystemPreference } = themeSlice.actions;
var selectTheme = (state) => state.theme.mode;
var selectEffectiveTheme = (state) => state.theme.mode === "system" ? state.theme.systemPreference : state.theme.mode;
var themeSlice_default = themeSlice.reducer;

// src/locales/en/translation.json
var translation_default = {
  common: {
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    search: "Search",
    filter: "Filter",
    noResults: "No results found"
  },
  auth: {
    login: "Login",
    logout: "Logout",
    register: "Register",
    forgotPassword: "Forgot Password",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    username: "Username",
    rememberMe: "Remember Me"
  },
  navigation: {
    home: "Home",
    profile: "Profile",
    settings: "Settings",
    dashboard: "Dashboard",
    users: "Users",
    about: "About"
  },
  validation: {
    required: "This field is required",
    email: "Please enter a valid email address",
    minLength: "Must be at least {{min}} characters",
    maxLength: "Must be at most {{max}} characters",
    passwordMatch: "Passwords must match",
    invalidFormat: "Invalid format"
  },
  theme: {
    light: "Light",
    dark: "Dark",
    system: "System"
  },
  components: {
    button: {
      loadingText: "Please wait..."
    },
    dialog: {
      close: "Close"
    },
    datePicker: {
      placeholder: "Select date...",
      today: "Today"
    }
  }
};

// src/locales/tr/translation.json
var translation_default2 = {
  common: {
    loading: "Y\xFCkleniyor...",
    error: "Bir hata olu\u015Ftu",
    success: "Ba\u015Far\u0131l\u0131",
    cancel: "\u0130ptal",
    save: "Kaydet",
    edit: "D\xFCzenle",
    delete: "Sil",
    search: "Ara",
    filter: "Filtrele",
    noResults: "Sonu\xE7 bulunamad\u0131"
  },
  auth: {
    login: "Giri\u015F Yap",
    logout: "\xC7\u0131k\u0131\u015F Yap",
    register: "Kay\u0131t Ol",
    forgotPassword: "\u015Eifremi Unuttum",
    email: "E-posta",
    password: "\u015Eifre",
    confirmPassword: "\u015Eifre Tekrar",
    username: "Kullan\u0131c\u0131 Ad\u0131",
    rememberMe: "Beni Hat\u0131rla"
  },
  navigation: {
    home: "Ana Sayfa",
    profile: "Profil",
    settings: "Ayarlar",
    dashboard: "Kontrol Paneli",
    users: "Kullan\u0131c\u0131lar",
    about: "Hakk\u0131nda"
  },
  validation: {
    required: "Bu alan zorunludur",
    email: "L\xFCtfen ge\xE7erli bir e-posta adresi girin",
    minLength: "En az {{min}} karakter olmal\u0131d\u0131r",
    maxLength: "En fazla {{max}} karakter olmal\u0131d\u0131r",
    passwordMatch: "\u015Eifreler e\u015Fle\u015Fmelidir",
    invalidFormat: "Ge\xE7ersiz format"
  },
  theme: {
    light: "A\xE7\u0131k",
    dark: "Koyu",
    system: "Sistem"
  },
  components: {
    button: {
      loadingText: "L\xFCtfen bekleyin..."
    },
    dialog: {
      close: "Kapat"
    },
    datePicker: {
      placeholder: "Tarih se\xE7in...",
      today: "Bug\xFCn"
    }
  }
};

// src/utils/environment.ts
var isDevelopment = true;

// src/locales/index.ts
var resources = {
  en: {
    translation: translation_default
  },
  tr: {
    translation: translation_default2
  }
};
i18n__default.default.use(LanguageDetector__default.default).use(reactI18next.initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: isDevelopment,
  interpolation: {
    escapeValue: false
    // React already escapes values
  },
  detection: {
    order: ["localStorage", "navigator"],
    lookupLocalStorage: "language"
  }
});
var locales_default = i18n__default.default;

// src/store/slices/langSlice.ts
var initialState2 = {
  currentLanguage: locales_default.language || "en",
  availableLanguages: ["en", "tr"]
};
var langSlice = toolkit.createSlice({
  name: "lang",
  initialState: initialState2,
  reducers: {
    setLanguage: (state, action) => {
      const lang = action.payload;
      if (state.availableLanguages.includes(lang)) {
        state.currentLanguage = lang;
        locales_default.changeLanguage(lang);
        if (typeof window !== "undefined") {
          localStorage.setItem("language", lang);
        }
      }
    }
  }
});
var { setLanguage } = langSlice.actions;
var selectCurrentLanguage = (state) => {
  var _a;
  return (_a = state.lang) == null ? void 0 : _a.currentLanguage;
};
var selectAvailableLanguages = (state) => {
  var _a;
  return (_a = state.lang) == null ? void 0 : _a.availableLanguages;
};
var langSlice_default = langSlice.reducer;
var initialState3 = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};
var userSlice = toolkit.createSlice({
  name: "user",
  initialState: initialState3,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});
var { setUser, logoutUser, setLoading, setError } = userSlice.actions;
var selectUser = (state) => state.user.user;
var selectIsAuthenticated = (state) => state.user.isAuthenticated;
var selectIsLoading = (state) => state.user.isLoading;
var selectError = (state) => state.user.error;
var userSlice_default = userSlice.reducer;

// src/services/api/axiosInterceptors.ts
var setupAxiosInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      var _a, _b;
      const originalRequest = error.config;
      if (((_a = error.response) == null ? void 0 : _a.status) === 401 && originalRequest) {
        const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
        if (refreshToken) {
          try {
            const response = await axiosInstance.post("/auth/refresh", {
              refreshToken
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
            }
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            store.dispatch(logoutUser());
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
          }
        } else {
          store.dispatch(logoutUser());
        }
      }
      switch ((_b = error.response) == null ? void 0 : _b.status) {
        case 400:
          console.error("Bad Request:", error.response.data);
          break;
        case 403:
          console.error("Forbidden:", error.response.data);
          break;
        case 404:
          console.error("Not Found:", error.response.data);
          break;
        case 500:
          console.error("Server Error:", error.response.data);
          break;
        default:
          console.error("Network Error:", error.message);
      }
      return Promise.reject(error);
    }
  );
};

// src/services/api/axiosBaseQuery.ts
var axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }) => {
  const axiosInstance = axios__default.default.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json"
    }
  });
  setupAxiosInterceptors(axiosInstance);
  return async ({ url, method = "GET", data, params, headers }) => {
    var _a, _b;
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: (_a = err.response) == null ? void 0 : _a.status,
          data: ((_b = err.response) == null ? void 0 : _b.data) || err.message
        }
      };
    }
  };
};

// src/services/api/apiSlice.ts
var apiSlice = react.createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
  }),
  tagTypes: ["User", "Posts", "Settings"],
  endpoints: (_builder) => ({})
});

// src/store/index.ts
var store = toolkit.configureStore({
  reducer: {
    theme: themeSlice_default,
    lang: langSlice_default,
    user: userSlice_default,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: isDevelopment
});
var useAppDispatch = () => reactRedux.useDispatch();
var useAppSelector = reactRedux.useSelector;

// src/hooks/useTheme.ts
function useTheme() {
  const dispatch = useAppDispatch();
  const effectiveTheme = useAppSelector(selectEffectiveTheme);
  React5.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "system";
      dispatch(setTheme(storedTheme));
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      dispatch(updateSystemPreference(mediaQuery.matches ? "dark" : "light"));
      const handleChange = (e) => {
        dispatch(updateSystemPreference(e.matches ? "dark" : "light"));
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [dispatch]);
  React5.useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const root = document.documentElement;
      if (effectiveTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [effectiveTheme]);
  return {
    theme: effectiveTheme,
    setTheme: (theme) => dispatch(setTheme(theme))
  };
}

// src/components/ThemeToggle/ThemeToggle.tsx
function ThemeToggle({ className }) {
  const { t } = reactI18next.useTranslation();
  const { theme, setTheme: setTheme2 } = useTheme();
  return /* @__PURE__ */ React5__default.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: () => setTheme2(theme === "dark" ? "light" : "dark"),
      className: cn("rounded-full", className),
      "aria-label": t(theme === "dark" ? "theme.light" : "theme.dark")
    },
    /* @__PURE__ */ React5__default.default.createElement(lucideReact.Sun, { className: "h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
    /* @__PURE__ */ React5__default.default.createElement(lucideReact.Moon, { className: "absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })
  );
}
function LanguageToggle({ className }) {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const availableLanguages = useAppSelector(selectAvailableLanguages);
  const handleLanguageChange = (value) => {
    dispatch(setLanguage(value));
  };
  return /* @__PURE__ */ React5__default.default.createElement("div", { className: cn("flex items-center space-x-2", className) }, /* @__PURE__ */ React5__default.default.createElement(lucideReact.Globe, { className: "h-4 w-4 text-neutral-500" }), /* @__PURE__ */ React5__default.default.createElement(Select, { value: currentLanguage, onValueChange: handleLanguageChange }, /* @__PURE__ */ React5__default.default.createElement(SelectTrigger, { className: "w-[70px] h-8" }, /* @__PURE__ */ React5__default.default.createElement(SelectValue, { placeholder: currentLanguage.toUpperCase() })), /* @__PURE__ */ React5__default.default.createElement(SelectContent, null, availableLanguages.map((lang) => /* @__PURE__ */ React5__default.default.createElement(SelectItem, { key: lang, value: lang }, lang.toUpperCase())))));
}

exports.Button = Button;
exports.Checkbox = Checkbox;
exports.Dialog = Dialog;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
exports.Form = Form;
exports.FormDescription = FormDescription;
exports.FormField = FormField;
exports.FormItem = FormItem;
exports.FormLabel = FormLabel;
exports.FormMessage = FormMessage;
exports.Input = Input;
exports.LanguageToggle = LanguageToggle;
exports.LoginForm = LoginForm;
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
exports.Switch = Switch;
exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
exports.Textarea = Textarea;
exports.ThemeToggle = ThemeToggle;
exports.Toast = Toast;
exports.ToastAction = ToastAction;
exports.ToastClose = ToastClose;
exports.ToastDescription = ToastDescription;
exports.ToastProvider = ToastProvider;
exports.ToastTitle = ToastTitle;
exports.ToastViewport = ToastViewport;
exports.buttonVariants = buttonVariants;
exports.cn = cn;
exports.debounce = debounce;
exports.forgotPasswordSchema = forgotPasswordSchema;
exports.formatDate = formatDate;
exports.get = get;
exports.i18n = locales_default;
exports.isDarkMode = isDarkMode;
exports.loginSchema = loginSchema;
exports.logoutUser = logoutUser;
exports.registerSchema = registerSchema;
exports.resetPasswordSchema = resetPasswordSchema;
exports.sanitizeHtml = sanitizeHtml;
exports.seaBlueTheme = seaBlueTheme;
exports.selectAvailableLanguages = selectAvailableLanguages;
exports.selectCurrentLanguage = selectCurrentLanguage;
exports.selectEffectiveTheme = selectEffectiveTheme;
exports.selectError = selectError;
exports.selectIsAuthenticated = selectIsAuthenticated;
exports.selectIsLoading = selectIsLoading;
exports.selectTheme = selectTheme;
exports.selectUser = selectUser;
exports.setError = setError;
exports.setLanguage = setLanguage;
exports.setLoading = setLoading;
exports.setTheme = setTheme;
exports.setUser = setUser;
exports.storage = storage;
exports.store = store;
exports.updateSystemPreference = updateSystemPreference;
exports.useAppDispatch = useAppDispatch;
exports.useAppSelector = useAppSelector;
exports.useForm = useForm;
exports.useFormField = useFormField;
exports.useTheme = useTheme;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map