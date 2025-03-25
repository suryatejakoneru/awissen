module.exports = {
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        // ... other plugins
      ],
    // ... other config
    theme: {
        extend: {
            colors: {
                'krai': {
                    dark: '#1A1B3F',
                    darker: '#13142F',
                    purple: '#6B5CA5',
                    orange: '#FF6B35',
                    'orange-light': '#FF9F1C',
                },
            },
            backgroundImage: {
                'gradient-sunset': 'linear-gradient(to right, #FF6B35, #FF9F1C)',
                'gradient-purple': 'linear-gradient(to right, #1A1B3F, #6B5CA5)',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                '3d': '0 20px 50px rgba(0, 0, 0, 0.3)',
                'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)',
            },
            keyframes: {
                'ken-burns': {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.1)' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'gradient': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                }
            },
            animation: {
                'ken-burns': 'ken-burns 20s ease-in-out infinite alternate',
                'float': 'float 3s ease-in-out infinite',
                'gradient': 'gradient 3s ease infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-slow': 'bounce 2s infinite'
            }
        }
    },
}