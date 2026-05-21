import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info, X, ShieldX } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div id="toast-wrapper" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let icon = <Info className="w-5 h-5 text-blue-400" />;
          let borderStyle = 'border-blue-500/30';
          const bgStyle = 'bg-slate-900/90 [background-image:linear-gradient(to_bottom,rgba(15,23,42,0.85),rgba(15,23,42,0.95))]';
          let glowColor = 'shadow-blue-500/10';

          if (toast.type === 'success') {
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
            borderStyle = 'border-emerald-500/30';
            glowColor = 'shadow-emerald-500/10';
          } else if (toast.type === 'warning') {
            icon = <AlertTriangle className="w-5 h-5 text-amber-400" />;
            borderStyle = 'border-amber-500/30';
            glowColor = 'shadow-amber-500/10';
          } else if (toast.type === 'error') {
            icon = <ShieldX className="w-5 h-5 text-rose-400" />;
            borderStyle = 'border-rose-500/30';
            glowColor = 'shadow-rose-400/10';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
              layout
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${borderStyle} ${bgStyle} ${glowColor} shadow-xl backdrop-blur-md`}
              id={`toast-item-${toast.id}`}
            >
              <div className="shrink-0 mt-0.5">{icon}</div>
              <div className="flex-1 text-sm font-medium text-slate-100 pr-1 leading-relaxed">
                {toast.message}
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-200 transition-colors p-0.5 hover:bg-white/5 rounded shrink-0"
                onClick={() => onDismiss(toast.id)}
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
