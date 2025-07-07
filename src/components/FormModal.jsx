
export default function FormModal({ children, onClose }) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm 
        flex items-center justify-center z-50 transition-opacity duration-300">
      <div 
        className="bg-white rounded-xl p-6 w-11/12 max-w-2xl max-h-[90vh] 
          overflow-y-auto shadow-2xl transform transition-all duration-300 
          scale-95 opacity-0 animate-fadeIn relative">
        <button
          onClick={onClose}
          className="text-red-500 text-right w-full font-bold mb-4"
        >
          ✕ Fechar
        </button>
        {children}
      </div>
    </div>
  )
}
