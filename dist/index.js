"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  Checkbox: () => Checkbox,
  Dialog: () => Dialog,
  DialogContent: () => DialogContent,
  DialogDescription: () => DialogDescription,
  DialogFooter: () => DialogFooter,
  DialogHeader: () => DialogHeader,
  DialogTitle: () => DialogTitle,
  DialogTrigger: () => DialogTrigger,
  Form: () => Form,
  FormDescription: () => FormDescription,
  FormField: () => FormField,
  FormItem: () => FormItem,
  FormLabel: () => FormLabel,
  FormMessage: () => FormMessage,
  Input: () => Input,
  LanguageToggle: () => LanguageToggle,
  LoginForm: () => LoginForm,
  Select: () => Select,
  SelectContent: () => SelectContent,
  SelectGroup: () => SelectGroup,
  SelectItem: () => SelectItem,
  SelectLabel: () => SelectLabel,
  SelectSeparator: () => SelectSeparator,
  SelectTrigger: () => SelectTrigger,
  SelectValue: () => SelectValue,
  Switch: () => Switch,
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  Textarea: () => Textarea,
  ThemeToggle: () => ThemeToggle,
  Toast: () => Toast,
  ToastAction: () => ToastAction,
  ToastClose: () => ToastClose,
  ToastDescription: () => ToastDescription,
  ToastProvider: () => ToastProvider,
  ToastTitle: () => ToastTitle,
  ToastViewport: () => ToastViewport,
  buttonVariants: () => buttonVariants,
  cn: () => cn,
  debounce: () => debounce,
  forgotPasswordSchema: () => forgotPasswordSchema,
  formatDate: () => formatDate,
  get: () => get,
  i18n: () => locales_default,
  isDarkMode: () => isDarkMode,
  loginSchema: () => loginSchema,
  logoutUser: () => logoutUser,
  registerSchema: () => registerSchema,
  resetPasswordSchema: () => resetPasswordSchema,
  sanitizeHtml: () => sanitizeHtml,
  seaBlueTheme: () => seaBlueTheme,
  selectAvailableLanguages: () => selectAvailableLanguages,
  selectCurrentLanguage: () => selectCurrentLanguage,
  selectEffectiveTheme: () => selectEffectiveTheme,
  selectError: () => selectError,
  selectIsAuthenticated: () => selectIsAuthenticated,
  selectIsLoading: () => selectIsLoading,
  selectTheme: () => selectTheme,
  selectUser: () => selectUser,
  setError: () => setError,
  setLanguage: () => setLanguage,
  setLoading: () => setLoading,
  setTheme: () => setTheme,
  setUser: () => setUser,
  storage: () => storage,
  store: () => store,
  updateSystemPreference: () => updateSystemPreference,
  useAppDispatch: () => useAppDispatch,
  useAppSelector: () => useAppSelector,
  useForm: () => useForm,
  useFormField: () => useFormField,
  useTheme: () => useTheme
});
module.exports = __toCommonJS(src_exports);

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

// src/components/Tabs/Tabs.tsx
var import_react = __toESM(require("react"));
var RadixTabs = __toESM(require("@radix-ui/react-tabs"));

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
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
  const travel = (regexp) => String.prototype.split.call(path, regexp).filter(Boolean).reduce(
    (res, key) => res !== null && res !== void 0 ? res[key] : res,
    obj
  );
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
var Tabs = RadixTabs.Root;
var TabsList = import_react.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react.default.createElement(
    RadixTabs.List,
    __spreadValues({
      ref,
      className: cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 p-1 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
        className
      )
    }, props)
  );
});
TabsList.displayName = RadixTabs.List.displayName;
var TabsTrigger = import_react.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react.default.createElement(
    RadixTabs.Trigger,
    __spreadValues({
      ref,
      className: cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm dark:ring-offset-neutral-950 dark:focus-visible:ring-primary-600 dark:data-[state=active]:bg-neutral-950 dark:data-[state=active]:text-primary-500",
        className
      )
    }, props)
  );
});
TabsTrigger.displayName = RadixTabs.Trigger.displayName;
var TabsContent = import_react.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react.default.createElement(
    RadixTabs.Content,
    __spreadValues({
      ref,
      className: cn(
        "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 dark:ring-offset-neutral-950 dark:focus-visible:ring-primary-600",
        className
      )
    }, props)
  );
});
TabsContent.displayName = RadixTabs.Content.displayName;

// src/components/Form/Form.tsx
var import_react2 = __toESM(require("react"));
var import_react_hook_form = require("react-hook-form");
var Form = (_a) => {
  var _b = _a, {
    children,
    className,
    form,
    onSubmit
  } = _b, htmlFormProps = __objRest(_b, [
    "children",
    "className",
    "form",
    "onSubmit"
  ]);
  return /* @__PURE__ */ import_react2.default.createElement(import_react_hook_form.FormProvider, __spreadValues({}, form), /* @__PURE__ */ import_react2.default.createElement(
    "form",
    __spreadValues({
      className: cn("space-y-6", className),
      onSubmit: form.handleSubmit(onSubmit)
    }, htmlFormProps),
    children
  ));
};
var FormFieldContext = import_react2.default.createContext(
  {}
);
var FormField = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ import_react2.default.createElement(FormFieldContext.Provider, { value: { name: props.name } }, /* @__PURE__ */ import_react2.default.createElement(import_react_hook_form.Controller, __spreadValues({}, props)));
};
var useFormField = () => {
  const fieldContext = import_react2.default.useContext(FormFieldContext);
  const itemContext = import_react2.default.useContext(FormItemContext);
  const { getFieldState, formState } = (0, import_react_hook_form.useFormContext)();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return __spreadValues({
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`
  }, fieldState);
};
var FormItemContext = import_react2.default.createContext(
  {}
);
var FormItem = import_react2.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const id = import_react2.default.useId();
  return /* @__PURE__ */ import_react2.default.createElement(FormItemContext.Provider, { value: { id } }, /* @__PURE__ */ import_react2.default.createElement("div", __spreadValues({ ref, className: cn("space-y-2", className) }, props)));
});
FormItem.displayName = "FormItem";
var FormLabel = import_react2.default.forwardRef((_a, ref) => {
  var _b = _a, { className, required, children } = _b, props = __objRest(_b, ["className", "required", "children"]);
  const { formItemId } = useFormField();
  return /* @__PURE__ */ import_react2.default.createElement(
    "label",
    __spreadValues({
      ref,
      className: cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      ),
      htmlFor: formItemId
    }, props),
    children,
    required && /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-error ml-1" }, "*")
  );
});
FormLabel.displayName = "FormLabel";
var FormDescription = import_react2.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ import_react2.default.createElement(
    "p",
    __spreadValues({
      ref,
      id: formDescriptionId,
      className: cn(
        "text-xs text-neutral-500 dark:text-neutral-400",
        className
      )
    }, props)
  );
});
FormDescription.displayName = "FormDescription";
var FormMessage = import_react2.default.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  const { error, formMessageId } = useFormField();
  const body = error ? String(error == null ? void 0 : error.message) : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ import_react2.default.createElement(
    "p",
    __spreadValues({
      ref,
      id: formMessageId,
      className: cn(
        "text-xs font-medium text-error dark:text-error",
        className
      )
    }, props),
    body
  );
});
FormMessage.displayName = "FormMessage";

// src/components/Toast/Toast.tsx
var import_react3 = __toESM(require("react"));
var import_lucide_react = require("lucide-react");
var RadixToast = __toESM(require("@radix-ui/react-toast"));
var ToastProvider = RadixToast.Provider;
var ToastViewport = import_react3.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react3.default.createElement(
    RadixToast.Viewport,
    __spreadValues({
      ref,
      className: cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )
    }, props)
  );
});
ToastViewport.displayName = RadixToast.Viewport.displayName;
var Toast = import_react3.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react3.default.createElement(
    RadixToast.Root,
    __spreadValues({
      ref,
      className: cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-neutral-200 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full bg-white dark:border-neutral-800 dark:bg-neutral-950",
        className
      )
    }, props)
  );
});
Toast.displayName = RadixToast.Root.displayName;
var ToastAction = import_react3.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react3.default.createElement(
    RadixToast.Action,
    __spreadValues({
      ref,
      className: cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:ring-offset-neutral-950 dark:hover:bg-neutral-800 dark:focus:ring-primary-600",
        className
      )
    }, props)
  );
});
ToastAction.displayName = RadixToast.Action.displayName;
var ToastClose = import_react3.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react3.default.createElement(
    RadixToast.Close,
    __spreadValues({
      ref,
      className: cn(
        "absolute right-2 top-2 rounded-md p-1 text-neutral-500 opacity-0 transition-opacity hover:text-neutral-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 dark:text-neutral-400 dark:hover:text-neutral-50",
        className
      ),
      "toast-close": ""
    }, props),
    /* @__PURE__ */ import_react3.default.createElement(import_lucide_react.X, { className: "h-4 w-4" })
  );
});
ToastClose.displayName = RadixToast.Close.displayName;
var ToastTitle = import_react3.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react3.default.createElement(
    RadixToast.Title,
    __spreadValues({
      ref,
      className: cn("text-sm font-semibold", className)
    }, props)
  );
});
ToastTitle.displayName = RadixToast.Title.displayName;
var ToastDescription = import_react3.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react3.default.createElement(
    RadixToast.Description,
    __spreadValues({
      ref,
      className: cn("text-sm opacity-90", className)
    }, props)
  );
});
ToastDescription.displayName = RadixToast.Description.displayName;

// src/components/Dialog/Dialog.tsx
var import_react4 = __toESM(require("react"));
var import_lucide_react2 = require("lucide-react");
var RadixDialog = __toESM(require("@radix-ui/react-dialog"));
var Dialog = RadixDialog.Root;
var DialogTrigger = RadixDialog.Trigger;
var DialogPortal = (_a) => {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ import_react4.default.createElement(RadixDialog.Portal, __spreadValues({}, props), /* @__PURE__ */ import_react4.default.createElement(
    "div",
    {
      className: cn(
        "fixed inset-0 z-50 flex items-start justify-center sm:items-center",
        className
      )
    },
    children
  ));
};
DialogPortal.displayName = RadixDialog.Portal.displayName;
var DialogOverlay = import_react4.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react4.default.createElement(
    RadixDialog.Overlay,
    __spreadValues({
      ref,
      className: cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
        className
      )
    }, props)
  );
});
DialogOverlay.displayName = RadixDialog.Overlay.displayName;
var DialogContent = import_react4.default.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ import_react4.default.createElement(DialogPortal, null, /* @__PURE__ */ import_react4.default.createElement(DialogOverlay, null), /* @__PURE__ */ import_react4.default.createElement(
    RadixDialog.Content,
    __spreadValues({
      ref,
      className: cn(
        "fixed z-50 grid w-full gap-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
        "dark:border-neutral-800 dark:bg-neutral-950",
        className
      )
    }, props),
    children,
    /* @__PURE__ */ import_react4.default.createElement(RadixDialog.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-primary-600 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400" }, /* @__PURE__ */ import_react4.default.createElement(import_lucide_react2.X, { className: "h-4 w-4" }), /* @__PURE__ */ import_react4.default.createElement("span", { className: "sr-only" }, "Close"))
  ));
});
DialogContent.displayName = RadixDialog.Content.displayName;
var DialogHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ import_react4.default.createElement(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )
    }, props)
  );
};
DialogHeader.displayName = "DialogHeader";
var DialogFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ import_react4.default.createElement(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react4.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react4.default.createElement(
    RadixDialog.Title,
    __spreadValues({
      ref,
      className: cn(
        "text-lg font-semibold leading-none tracking-tight text-neutral-900 dark:text-neutral-50",
        className
      )
    }, props)
  );
});
DialogTitle.displayName = RadixDialog.Title.displayName;
var DialogDescription = import_react4.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react4.default.createElement(
    RadixDialog.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-neutral-500 dark:text-neutral-400", className)
    }, props)
  );
});
DialogDescription.displayName = RadixDialog.Description.displayName;

// src/components/Select/Select.tsx
var import_react5 = __toESM(require("react"));
var RadixSelect = __toESM(require("@radix-ui/react-select"));
var import_lucide_react3 = require("lucide-react");
var Select = RadixSelect.Root;
var SelectGroup = RadixSelect.Group;
var SelectValue = RadixSelect.Value;
var SelectTrigger = import_react5.default.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ import_react5.default.createElement(
    RadixSelect.Trigger,
    __spreadValues({
      ref,
      className: cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-primary-600",
        className
      )
    }, props),
    children,
    /* @__PURE__ */ import_react5.default.createElement(RadixSelect.Icon, { asChild: true }, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react3.ChevronDown, { className: "h-4 w-4 opacity-50" }))
  );
});
SelectTrigger.displayName = RadixSelect.Trigger.displayName;
var SelectContent = import_react5.default.forwardRef((_a, ref) => {
  var _b = _a, { className, children, position = "popper" } = _b, props = __objRest(_b, ["className", "children", "position"]);
  return /* @__PURE__ */ import_react5.default.createElement(RadixSelect.Portal, null, /* @__PURE__ */ import_react5.default.createElement(
    RadixSelect.Content,
    __spreadValues({
      ref,
      className: cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-900 shadow-md animate-in fade-in-80 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
        position === "popper" && "translate-y-1",
        className
      ),
      position
    }, props),
    /* @__PURE__ */ import_react5.default.createElement(RadixSelect.ScrollUpButton, { className: "flex items-center justify-center h-6 bg-white text-neutral-600 cursor-default dark:bg-neutral-950 dark:text-neutral-400" }, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react3.ChevronUp, { className: "h-4 w-4" })),
    /* @__PURE__ */ import_react5.default.createElement(
      RadixSelect.Viewport,
      {
        className: cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )
      },
      children
    ),
    /* @__PURE__ */ import_react5.default.createElement(RadixSelect.ScrollDownButton, { className: "flex items-center justify-center h-6 bg-white text-neutral-600 cursor-default dark:bg-neutral-950 dark:text-neutral-400" }, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react3.ChevronDown, { className: "h-4 w-4" }))
  ));
});
SelectContent.displayName = RadixSelect.Content.displayName;
var SelectLabel = import_react5.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react5.default.createElement(
    RadixSelect.Label,
    __spreadValues({
      ref,
      className: cn(
        "py-1.5 pl-8 pr-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100",
        className
      )
    }, props)
  );
});
SelectLabel.displayName = RadixSelect.Label.displayName;
var SelectItem = import_react5.default.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ import_react5.default.createElement(
    RadixSelect.Item,
    __spreadValues({
      ref,
      className: cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-primary-100 focus:text-primary-800 dark:focus:bg-primary-800 dark:focus:text-primary-100",
        className
      )
    }, props),
    /* @__PURE__ */ import_react5.default.createElement("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ import_react5.default.createElement(RadixSelect.ItemIndicator, null, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react3.Check, { className: "h-4 w-4" }))),
    /* @__PURE__ */ import_react5.default.createElement(RadixSelect.ItemText, null, children)
  );
});
SelectItem.displayName = RadixSelect.Item.displayName;
var SelectSeparator = import_react5.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react5.default.createElement(
    RadixSelect.Separator,
    __spreadValues({
      ref,
      className: cn(
        "-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800",
        className
      )
    }, props)
  );
});
SelectSeparator.displayName = RadixSelect.Separator.displayName;

// src/components/Input/Input.tsx
var import_react6 = __toESM(require("react"));
var Input = import_react6.default.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, type, error } = _b, props = __objRest(_b, ["className", "type", "error"]);
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: "relative w-full" }, /* @__PURE__ */ import_react6.default.createElement(
      "input",
      __spreadValues({
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-primary-600",
          error && "border-error focus:ring-error",
          className
        ),
        ref
      }, props)
    ), error && /* @__PURE__ */ import_react6.default.createElement("p", { className: "mt-1 text-xs text-error dark:text-error" }, error));
  }
);
Input.displayName = "Input";

// src/components/Switch/Switch.tsx
var import_react7 = __toESM(require("react"));
var RadixSwitch = __toESM(require("@radix-ui/react-switch"));
var Switch = import_react7.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react7.default.createElement(
    RadixSwitch.Root,
    __spreadProps(__spreadValues({
      className: cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-neutral-200 dark:data-[state=unchecked]:bg-neutral-700 dark:focus-visible:ring-primary-600 dark:data-[state=checked]:bg-primary-600",
        className
      )
    }, props), {
      ref
    }),
    /* @__PURE__ */ import_react7.default.createElement(
      RadixSwitch.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-neutral-50"
        )
      }
    )
  );
});
Switch.displayName = RadixSwitch.Root.displayName;

// src/components/Textarea/Textarea.tsx
var import_react8 = __toESM(require("react"));
var Textarea = import_react8.default.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, error } = _b, props = __objRest(_b, ["className", "error"]);
    return /* @__PURE__ */ import_react8.default.createElement("div", { className: "relative w-full" }, /* @__PURE__ */ import_react8.default.createElement(
      "textarea",
      __spreadValues({
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-primary-600",
          error && "border-error focus:ring-error",
          className
        ),
        ref
      }, props)
    ), error && /* @__PURE__ */ import_react8.default.createElement("p", { className: "mt-1 text-xs text-error dark:text-error" }, error));
  }
);
Textarea.displayName = "Textarea";

// src/components/Checkbox/Checkbox.tsx
var import_react9 = __toESM(require("react"));
var import_lucide_react4 = require("lucide-react");
var RadixCheckbox = __toESM(require("@radix-ui/react-checkbox"));
var Checkbox = import_react9.default.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ import_react9.default.createElement(
    RadixCheckbox.Root,
    __spreadValues({
      ref,
      className: cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-neutral-200 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:focus:ring-primary-600 data-[state=checked]:bg-primary-500 data-[state=checked]:text-white dark:data-[state=checked]:bg-primary-600",
        className
      )
    }, props),
    /* @__PURE__ */ import_react9.default.createElement(RadixCheckbox.Indicator, { className: "flex items-center justify-center text-current" }, /* @__PURE__ */ import_react9.default.createElement(import_lucide_react4.Check, { className: "h-3 w-3" }))
  );
});
Checkbox.displayName = RadixCheckbox.Root.displayName;

// src/components/Button/Button.tsx
var import_react10 = __toESM(require("react"));
var import_class_variance_authority = require("class-variance-authority");
var buttonVariants = (0, import_class_variance_authority.cva)(
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
var Button = (0, import_react10.forwardRef)(
  (_a, ref) => {
    var _b = _a, {
      children,
      className,
      size = "md",
      asChild = false,
      disabled = false,
      fullWidth = false,
      variant = "default"
    } = _b, props = __objRest(_b, [
      "children",
      "className",
      "size",
      "asChild",
      "disabled",
      "fullWidth",
      "variant"
    ]);
    return /* @__PURE__ */ import_react10.default.createElement(
      "button",
      __spreadValues({
        ref,
        className: cn(buttonVariants({ variant, size, fullWidth, className }))
      }, props),
      children
    );
  }
);
Button.displayName = "Button";

// src/components/auth/LoginForm.tsx
var import_react11 = __toESM(require("react"));
var import_react_i18next2 = require("react-i18next");

// src/hooks/useForm.ts
var import_zod = require("zod");
var import_react_i18next = require("react-i18next");
var import_zod2 = require("@hookform/resolvers/zod");
var import_react_hook_form2 = require("react-hook-form");
function useForm(schema, options) {
  const { t } = (0, import_react_i18next.useTranslation)();
  const resolver = (0, import_zod2.zodResolver)(schema, {
    errorMap: (issue, ctx) => {
      let message = issue.message;
      switch (issue.code) {
        case import_zod.z.ZodIssueCode.invalid_type:
          if (issue.received === "undefined" || issue.received === "null") {
            message = t("validation.required");
          }
          break;
        case import_zod.z.ZodIssueCode.too_small:
          if (issue.type === "string") {
            message = t("validation.minLength", { min: issue.minimum });
          }
          break;
        case import_zod.z.ZodIssueCode.too_big:
          if (issue.type === "string") {
            message = t("validation.maxLength", { max: issue.maximum });
          }
          break;
        case import_zod.z.ZodIssueCode.invalid_string:
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
  return (0, import_react_hook_form2.useForm)(__spreadValues({
    resolver
  }, options));
}

// src/lib/validations/auth.ts
var import_zod3 = require("zod");
var loginSchema = import_zod3.z.object({
  email: import_zod3.z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: import_zod3.z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: import_zod3.z.boolean().optional()
});
var registerSchema = import_zod3.z.object({
  name: import_zod3.z.string().min(1, { message: "Name is required" }).min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be less than 50 characters" }),
  email: import_zod3.z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: import_zod3.z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter"
  }).regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter"
  }).regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: import_zod3.z.string().min(1, { message: "Confirm password is required" }),
  terms: import_zod3.z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" })
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
var forgotPasswordSchema = import_zod3.z.object({
  email: import_zod3.z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" })
});
var resetPasswordSchema = import_zod3.z.object({
  password: import_zod3.z.string().min(1, { message: "Password is required" }).min(8, { message: "Password must be at least 8 characters" }).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter"
  }).regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter"
  }).regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: import_zod3.z.string().min(1, { message: "Confirm password is required" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

// src/components/auth/LoginForm.tsx
function LoginForm({ onSubmit, isLoading = false }) {
  const { t } = (0, import_react_i18next2.useTranslation)();
  const form = useForm(loginSchema, {
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });
  return /* @__PURE__ */ import_react11.default.createElement(Form, { form, onSubmit, className: "space-y-6" }, /* @__PURE__ */ import_react11.default.createElement(
    FormField,
    {
      control: form.control,
      name: "email",
      render: ({ field }) => /* @__PURE__ */ import_react11.default.createElement(FormItem, null, /* @__PURE__ */ import_react11.default.createElement(FormLabel, { required: true }, t("auth.email")), /* @__PURE__ */ import_react11.default.createElement(
        Input,
        __spreadValues({
          type: "email",
          placeholder: "email@example.com",
          disabled: isLoading
        }, field)
      ), /* @__PURE__ */ import_react11.default.createElement(FormMessage, null))
    }
  ), /* @__PURE__ */ import_react11.default.createElement(
    FormField,
    {
      control: form.control,
      name: "password",
      render: ({ field }) => /* @__PURE__ */ import_react11.default.createElement(FormItem, null, /* @__PURE__ */ import_react11.default.createElement(FormLabel, { required: true }, t("auth.password")), /* @__PURE__ */ import_react11.default.createElement(Input, __spreadValues({ type: "password", disabled: isLoading }, field)), /* @__PURE__ */ import_react11.default.createElement(FormMessage, null))
    }
  ), /* @__PURE__ */ import_react11.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react11.default.createElement(
    FormField,
    {
      control: form.control,
      name: "rememberMe",
      render: ({ field }) => /* @__PURE__ */ import_react11.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react11.default.createElement(
        Checkbox,
        {
          id: "rememberMe",
          checked: field.value,
          onCheckedChange: field.onChange,
          disabled: isLoading
        }
      ), /* @__PURE__ */ import_react11.default.createElement(
        "label",
        {
          htmlFor: "rememberMe",
          className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        },
        t("auth.rememberMe")
      ))
    }
  ), /* @__PURE__ */ import_react11.default.createElement(
    Button,
    {
      variant: "ghost",
      className: "px-0 text-sm",
      disabled: isLoading,
      type: "button"
    },
    t("auth.forgotPassword")
  )), /* @__PURE__ */ import_react11.default.createElement(Button, { type: "submit", fullWidth: true, disabled: isLoading, className: "mt-6" }, isLoading ? t("components.button.loadingText") : t("auth.login")));
}

// src/components/ThemeToggle/ThemeToggle.tsx
var import_react14 = __toESM(require("react"));
var import_lucide_react5 = require("lucide-react");
var import_react_i18next4 = require("react-i18next");

// src/hooks/useTheme.ts
var import_react13 = require("react");

// src/store/index.ts
var import_toolkit4 = require("@reduxjs/toolkit");
var import_react_redux = require("react-redux");

// src/store/slices/langSlice.ts
var import_toolkit = require("@reduxjs/toolkit");

// src/locales/index.ts
var import_i18next = __toESM(require("i18next"));
var import_react_i18next3 = require("react-i18next");
var import_i18next_browser_languagedetector = __toESM(require("i18next-browser-languagedetector"));

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

// src/locales/index.ts
var resources = {
  en: {
    translation: translation_default
  },
  tr: {
    translation: translation_default2
  }
};
import_i18next.default.use(import_i18next_browser_languagedetector.default).use(import_react_i18next3.initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false
    // React already escapes values
  },
  detection: {
    order: ["localStorage", "navigator"],
    lookupLocalStorage: "language"
  }
});
var locales_default = import_i18next.default;

// src/store/slices/langSlice.ts
var initialState = {
  currentLanguage: locales_default.language || "en",
  availableLanguages: ["en", "tr"]
};
var langSlice = (0, import_toolkit.createSlice)({
  name: "lang",
  initialState,
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

// src/store/slices/userSlice.ts
var import_toolkit2 = require("@reduxjs/toolkit");
var initialState2 = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};
var userSlice = (0, import_toolkit2.createSlice)({
  name: "user",
  initialState: initialState2,
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

// src/store/slices/themeSlice.ts
var import_toolkit3 = require("@reduxjs/toolkit");
var initialState3 = {
  mode: "system",
  systemPreference: isDarkMode() ? "dark" : "light"
};
var themeSlice = (0, import_toolkit3.createSlice)({
  name: "theme",
  initialState: initialState3,
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

// src/services/api/apiSlice.ts
var import_react12 = require("@reduxjs/toolkit/query/react");

// src/services/api/axiosBaseQuery.ts
var import_axios = __toESM(require("axios"));

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
  const axiosInstance = import_axios.default.create({
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
var apiSlice = (0, import_react12.createApi)({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
  }),
  tagTypes: ["User", "Posts", "Settings"],
  endpoints: (builder) => ({})
});

// src/store/index.ts
var store = (0, import_toolkit4.configureStore)({
  reducer: {
    theme: themeSlice_default,
    lang: langSlice_default,
    user: userSlice_default,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production"
});
var useAppDispatch = () => (0, import_react_redux.useDispatch)();
var useAppSelector = import_react_redux.useSelector;

// src/hooks/useTheme.ts
function useTheme() {
  const dispatch = useAppDispatch();
  const effectiveTheme = useAppSelector(selectEffectiveTheme);
  (0, import_react13.useEffect)(() => {
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
  (0, import_react13.useEffect)(() => {
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
  const { t } = (0, import_react_i18next4.useTranslation)();
  const { theme, setTheme: setTheme2 } = useTheme();
  return /* @__PURE__ */ import_react14.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: () => setTheme2(theme === "dark" ? "light" : "dark"),
      className: cn("rounded-full", className),
      "aria-label": t(theme === "dark" ? "theme.light" : "theme.dark")
    },
    /* @__PURE__ */ import_react14.default.createElement(import_lucide_react5.Sun, { className: "h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
    /* @__PURE__ */ import_react14.default.createElement(import_lucide_react5.Moon, { className: "absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })
  );
}

// src/components/LanguageToggle/LanguageToggle.tsx
var import_react15 = __toESM(require("react"));
var import_lucide_react6 = require("lucide-react");
function LanguageToggle({ className }) {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const availableLanguages = useAppSelector(selectAvailableLanguages);
  const handleLanguageChange = (value) => {
    dispatch(setLanguage(value));
  };
  return /* @__PURE__ */ import_react15.default.createElement("div", { className: cn("flex items-center space-x-2", className) }, /* @__PURE__ */ import_react15.default.createElement(import_lucide_react6.Globe, { className: "h-4 w-4 text-neutral-500" }), /* @__PURE__ */ import_react15.default.createElement(Select, { value: currentLanguage, onValueChange: handleLanguageChange }, /* @__PURE__ */ import_react15.default.createElement(SelectTrigger, { className: "w-[70px] h-8" }, /* @__PURE__ */ import_react15.default.createElement(SelectValue, { placeholder: currentLanguage.toUpperCase() })), /* @__PURE__ */ import_react15.default.createElement(SelectContent, null, availableLanguages.map((lang) => /* @__PURE__ */ import_react15.default.createElement(SelectItem, { key: lang, value: lang }, lang.toUpperCase())))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LanguageToggle,
  LoginForm,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ThemeToggle,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  buttonVariants,
  cn,
  debounce,
  forgotPasswordSchema,
  formatDate,
  get,
  i18n,
  isDarkMode,
  loginSchema,
  logoutUser,
  registerSchema,
  resetPasswordSchema,
  sanitizeHtml,
  seaBlueTheme,
  selectAvailableLanguages,
  selectCurrentLanguage,
  selectEffectiveTheme,
  selectError,
  selectIsAuthenticated,
  selectIsLoading,
  selectTheme,
  selectUser,
  setError,
  setLanguage,
  setLoading,
  setTheme,
  setUser,
  storage,
  store,
  updateSystemPreference,
  useAppDispatch,
  useAppSelector,
  useForm,
  useFormField,
  useTheme
});
