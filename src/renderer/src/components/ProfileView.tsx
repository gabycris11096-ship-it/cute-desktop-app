import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Briefcase, Mail, Code, Edit2, Save, Phone, Upload, Power } from 'lucide-react'

export interface UserProfile {
  nombre: string
  rol: string
  bio: string
  linkedin: string
  github: string
  whatsapp?: string
  email?: string
  foto?: string
}

interface ProfileViewProps {
  profile: UserProfile
  isEditing: boolean
  onBack: () => void
  onToggleEdit: () => void
  onSave: () => void
  onChangeProfile: (updated: Partial<UserProfile>) => void
  onExit?: () => void
}

const ProfileView = ({
  profile,
  isEditing,
  onBack,
  onToggleEdit,
  onSave,
  onChangeProfile,
  onExit
}: ProfileViewProps): React.JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChangeProfile({ foto: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <motion.div
      key="profile-view"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={onBack}
            style={{ color: 'var(--app-primary)', display: 'flex', alignItems: 'center' }}
          >
            <ArrowLeft size={32} />
          </motion.button>
          <h2 style={{ fontSize: '2rem', color: 'var(--app-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Mi Perfil <User size={28} color="var(--app-primary)" />
          </h2>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {onExit && !isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExit}
              style={{
                background: '#ff6b81',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 700,
                fontSize: '0.9rem',
                boxShadow: '0 4px 0 rgba(0,0,0,0.1)'
              }}
            >
              <Power size={18} /> Apagar Perfil
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isEditing ? onSave : onToggleEdit}
            style={{
              background: isEditing ? 'var(--color-green)' : 'var(--app-primary)',
              color: 'white',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 4px 0 rgba(0,0,0,0.1)'
            }}
          >
            {isEditing ? <><Save size={18} /> Guardar</> : <><Edit2 size={18} /> Editar</>}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: 'var(--app-card-bg, white)', padding: '1rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-cute)', border: '3px solid var(--app-primary)', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1, overflowY: 'hidden' }}>
        
        {/* Avatar & Name Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', borderBottom: '2px dashed var(--color-lavender)', paddingBottom: '1rem' }}>
          
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />

          <motion.div 
            whileHover={isEditing ? { scale: 1.05 } : {}}
            onClick={() => isEditing && fileInputRef.current?.click()}
            style={{ 
              width: '90px', 
              height: '90px', 
              background: 'var(--color-bg)', 
              borderRadius: '50%', 
              border: '3px solid var(--color-lavender)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              cursor: isEditing ? 'pointer' : 'default',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {profile.foto ? (
              <img src={profile.foto} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={64} color="var(--color-lavender)" />
            )}
            
            {isEditing && (
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                background: 'rgba(217, 70, 239, 0.8)', 
                padding: '0.2rem', 
                display: 'flex', 
                justifyContent: 'center' 
              }}>
                <Upload size={20} color="white" />
              </div>
            )}
          </motion.div>

          <div style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
            {isEditing ? (
              <input 
                value={profile.nombre} 
                onChange={e => onChangeProfile({ nombre: e.target.value })} 
                placeholder="Tu Nombre"
                style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text)', textAlign: 'center', width: '100%', border: '2px solid var(--color-lavender)', borderRadius: 'var(--radius-sm)', padding: '0.5rem', marginBottom: '0.5rem' }}
              />
            ) : (
              <h1 style={{ fontSize: '2.5rem', color: 'var(--color-text)', margin: 0 }}>{profile.nombre || 'Tu Nombre'}</h1>
            )}
            
            {isEditing ? (
              <input 
                value={profile.rol} 
                onChange={e => onChangeProfile({ rol: e.target.value })} 
                placeholder="Tu Rol (ej. QA Tester)"
                style={{ fontSize: '1.1rem', color: 'var(--color-lavender)', textAlign: 'center', width: '100%', border: '2px solid var(--color-lavender)', borderRadius: 'var(--radius-sm)', padding: '0.4rem', fontWeight: 600 }}
              />
            ) : (
              <p style={{ fontSize: '1.2rem', color: 'var(--color-lavender)', fontWeight: 700, margin: '0.5rem 0 0 0' }}>{profile.rol || 'QA Tester Junior'}</p>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={18} color="var(--color-lavender)" /> Sobre mí
          </h3>
          <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            {isEditing ? (
              <textarea 
                value={profile.bio} 
                onChange={e => onChangeProfile({ bio: e.target.value })} 
                placeholder="Escribe algo sobre ti..."
                style={{ width: '100%', minHeight: '60px', padding: '0.5rem', border: '2px solid var(--color-lavender)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', lineHeight: 1.4, resize: 'vertical' }}
              />
            ) : (
              <p style={{ color: 'var(--color-text)', lineHeight: 1.4, fontSize: '0.9rem', margin: 0 }}>
                {profile.bio || '¡Hola! Escribe una pequeña biografía para tu perfil.'}
              </p>
            )}
          </div>
        </div>

        {/* Social Links Section */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={18} color="var(--color-lavender)" /> Enlaces
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            {/* LinkedIn */}
            <div style={{ background: 'var(--color-bg)', padding: '0.8rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Briefcase size={20} color="#0A66C2" />
              {isEditing ? (
                <input 
                  value={profile.linkedin} 
                  onChange={e => onChangeProfile({ linkedin: e.target.value })} 
                  placeholder="URL de LinkedIn"
                  style={{ width: '100%', padding: '0.3rem', border: '2px solid var(--color-lavender)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                />
              ) : (
                <span style={{ color: 'var(--color-text)', fontWeight: 600, wordBreak: 'break-all', fontSize: '0.9rem' }}>
                  {profile.linkedin || 'Agregar LinkedIn'}
                </span>
              )}
            </div>
            
            {/* GitHub */}
            <div style={{ background: 'var(--color-bg)', padding: '0.8rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Code size={20} color="#333" />
              {isEditing ? (
                <input 
                  value={profile.github} 
                  onChange={e => onChangeProfile({ github: e.target.value })} 
                  placeholder="URL de GitHub"
                  style={{ width: '100%', padding: '0.3rem', border: '2px solid var(--color-lavender)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                />
              ) : (
                <span style={{ color: 'var(--color-text)', fontWeight: 600, wordBreak: 'break-all', fontSize: '0.9rem' }}>
                  {profile.github || 'Agregar GitHub'}
                </span>
              )}
            </div>
            
            {/* Email */}
            <div style={{ background: 'var(--color-bg)', padding: '0.8rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Mail size={20} color="#D14836" />
              {isEditing ? (
                <input 
                  type="email"
                  value={profile.email || ''} 
                  onChange={e => onChangeProfile({ email: e.target.value })} 
                  placeholder="Tu Email"
                  style={{ width: '100%', padding: '0.3rem', border: '2px solid var(--color-lavender)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                />
              ) : (
                <span style={{ color: 'var(--color-text)', fontWeight: 600, wordBreak: 'break-all', fontSize: '0.9rem' }}>
                  {profile.email || 'Agregar Email'}
                </span>
              )}
            </div>
            
            {/* WhatsApp */}
            <div style={{ background: 'var(--color-bg)', padding: '0.8rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Phone size={20} color="#25D366" />
              {isEditing ? (
                <input 
                  type="tel"
                  value={profile.whatsapp || ''} 
                  onChange={e => onChangeProfile({ whatsapp: e.target.value })} 
                  placeholder="Ej. +1234567890"
                  style={{ width: '100%', padding: '0.3rem', border: '2px solid var(--color-lavender)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                />
              ) : (
                <span style={{ color: 'var(--color-text)', fontWeight: 600, wordBreak: 'break-all', fontSize: '0.9rem' }}>
                  {profile.whatsapp || 'Agregar WhatsApp'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileView
