import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Palette, 
  Scale, 
  Briefcase, 
  FlaskConical, 
  HardHat, 
  Cpu, 
  HeartPulse, 
  Leaf, 
  Mic, 
  Plane,
  ChevronRight,
  RotateCcw,
  CheckCircle,
  Award,
  Star,
  ArrowRight
} from 'lucide-react';

// --- CONFIGURACIÓN DE MARCA ---
const LOGO_URL = "https://empleoconectarh.com.ar/wp-content/uploads/2025/11/Fondo.png";

// --- ESTILOS PERSONALIZADOS (CSS INLINE PARA ANIMACIONES) ---
const styles = `
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-enter {
    animation: fadeInScale 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-slide-in {
    animation: slideInRight 0.4s ease-out forwards;
  }
`;

// --- DATOS ---
const CATEGORIAS = {
  EDUCACION: {
    id: 'EDUCACION',
    nombre: 'Educación y Pedagogía',
    icon: <BookOpen className="w-full h-full" />,
    color: "text-blue-600",
    bg: "bg-blue-100",
    carreras: 'Pedagogía, Docencia, Educación Especial, Psicopedagogía.',
    habilidades: ['Comunicación efectiva', 'Empatía y paciencia', 'Planificación', 'Liderazgo educativo'],
    descripcion: 'Tienes el don de enseñar. Tu paciencia y capacidad para transmitir ideas te convierten en un guía natural para los demás.'
  },
  ARTES: {
    id: 'ARTES',
    nombre: 'Artes y Humanidades',
    icon: <Palette className="w-full h-full" />,
    color: "text-pink-600",
    bg: "bg-pink-100",
    carreras: 'Literatura, Historia, Filosofía, Bellas Artes, Música.',
    habilidades: ['Pensamiento crítico', 'Creatividad', 'Expresión artística', 'Sensibilidad estética'],
    descripcion: 'Ves el mundo a través de la creatividad y la reflexión. Valoras la cultura y la expresión humana por encima de todo.'
  },
  SOCIALES: {
    id: 'SOCIALES',
    nombre: 'Ciencias Sociales y Derecho',
    icon: <Scale className="w-full h-full" />,
    color: "text-purple-600",
    bg: "bg-purple-100",
    carreras: 'Sociología, Psicología, Derecho, Trabajo Social.',
    habilidades: ['Análisis social', 'Ética y justicia', 'Argumentación', 'Comprensión humana'],
    descripcion: 'Te mueve la justicia y el comportamiento humano. Tienes la capacidad de entender y mejorar la sociedad.'
  },
  NEGOCIOS: {
    id: 'NEGOCIOS',
    nombre: 'Administración y Negocios',
    icon: <Briefcase className="w-full h-full" />,
    color: "text-slate-700",
    bg: "bg-slate-200",
    carreras: 'Administración, Contabilidad, Finanzas, Marketing.',
    habilidades: ['Liderazgo', 'Estrategia', 'Visión comercial', 'Gestión eficiente'],
    descripcion: 'Eres un líder nato. Tu visión estratégica y capacidad de organización te llevarán al éxito en el mundo empresarial.'
  },
  CIENCIAS: {
    id: 'CIENCIAS',
    nombre: 'Ciencias Exactas y Naturales',
    icon: <FlaskConical className="w-full h-full" />,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    carreras: 'Física, Química, Biología, Matemáticas, Estadística.',
    habilidades: ['Lógica matemática', 'Rigor científico', 'Observación', 'Análisis de datos'],
    descripcion: 'Tu mente es inquisitiva y precisa. Buscas la verdad a través de la evidencia, la lógica y el método científico.'
  },
  INGENIERIA: {
    id: 'INGENIERIA',
    nombre: 'Ingeniería y Construcción',
    icon: <HardHat className="w-full h-full" />,
    color: "text-orange-600",
    bg: "bg-orange-100",
    carreras: 'Ing. Civil, Mecánica, Industrial, Arquitectura.',
    habilidades: ['Resolución técnica', 'Innovación práctica', 'Diseño espacial', 'Gestión de proyectos'],
    descripcion: 'Eres un constructor de soluciones. Te apasiona entender cómo funcionan las cosas y hacerlas más eficientes.'
  },
  TIC: {
    id: 'TIC',
    nombre: 'Tecnología e Informática',
    icon: <Cpu className="w-full h-full" />,
    color: "text-cyan-600",
    bg: "bg-cyan-100",
    carreras: 'Desarrollo de Software, Ciencia de Datos, Ciberseguridad.',
    habilidades: ['Lógica de programación', 'Innovación digital', 'Resolución de bugs', 'Adaptabilidad'],
    descripcion: 'El futuro es tu presente. Te mueves como pez en el agua en entornos digitales y disfrutas creando tecnología.'
  },
  SALUD: {
    id: 'SALUD',
    nombre: 'Salud y Bienestar',
    icon: <HeartPulse className="w-full h-full" />,
    color: "text-red-600",
    bg: "bg-red-100",
    carreras: 'Medicina, Enfermería, Nutrición, Odontología.',
    habilidades: ['Vocación de servicio', 'Resiliencia', 'Precisión clínica', 'Empatía profunda'],
    descripcion: 'Tu vocación es cuidar. Tienes la fortaleza y la sensibilidad necesarias para preservar la vida y el bienestar.'
  },
  AGRO: {
    id: 'AGRO',
    nombre: 'Agronomía y Veterinaria',
    icon: <Leaf className="w-full h-full" />,
    color: "text-green-700",
    bg: "bg-green-100",
    carreras: 'Veterinaria, Ingeniería Agrónoma, Zootecnia.',
    habilidades: ['Conexión natural', 'Biología aplicada', 'Trabajo de campo', 'Sostenibilidad'],
    descripcion: 'Tu lugar no es una oficina cerrada. Te realizas en contacto con la tierra, los animales y los ciclos de la naturaleza.'
  },
  COMUNICACION: {
    id: 'COMUNICACION',
    nombre: 'Comunicación y Medios',
    icon: <Mic className="w-full h-full" />,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    carreras: 'Periodismo, Publicidad, Comunicación Audiovisual.',
    habilidades: ['Oratoria y redacción', 'Storytelling', 'Creatividad mediática', 'Persuasión'],
    descripcion: 'Sabes que la palabra tiene poder. Tienes el talento para informar, entretener y conectar con grandes audiencias.'
  },
  TURISMO: {
    id: 'TURISMO',
    nombre: 'Turismo y Hospitalidad',
    icon: <Plane className="w-full h-full" />,
    color: "text-teal-600",
    bg: "bg-teal-100",
    carreras: 'Turismo, Hotelería, Gastronomía, Relaciones Públicas.',
    habilidades: ['Servicio al cliente', 'Idiomas', 'Organización de eventos', 'Interculturalidad'],
    descripcion: 'Eres un embajador de experiencias. Disfrutas del intercambio cultural y de hacer sentir bien a las personas.'
  }
};

const PREGUNTAS = [
  { id: 1, categoria: 'EDUCACION', texto: '¿Disfrutas explicando cosas a los demás y tienes paciencia para asegurar que entiendan?' },
  { id: 2, categoria: 'ARTES', texto: '¿Te consideras creativo y te gusta analizar obras literarias o artísticas?' },
  { id: 3, categoria: 'SOCIALES', texto: '¿Te interesa defender causas justas y debatir ideas sobre la sociedad?' },
  { id: 4, categoria: 'NEGOCIOS', texto: '¿Te ves liderando un equipo y tomando decisiones financieras estratégicas?' },
  { id: 5, categoria: 'CIENCIAS', texto: '¿Te gusta realizar experimentos y usar la lógica matemática?' },
  { id: 6, categoria: 'INGENIERIA', texto: '¿Te motiva resolver problemas técnicos y diseñar estructuras o máquinas?' },
  { id: 7, categoria: 'TIC', texto: '¿Te atrae la programación y aprender nuevas tecnologías constantemente?' },
  { id: 8, categoria: 'SALUD', texto: '¿Sientes vocación por cuidar a los enfermos y mantienes la calma bajo presión?' },
  { id: 9, categoria: 'AGRO', texto: '¿Prefieres trabajar al aire libre con plantas o animales en vez de una oficina?' },
  { id: 10, categoria: 'COMUNICACION', texto: '¿Se te da bien contar historias y escribir textos persuasivos?' },
  { id: 11, categoria: 'TURISMO', texto: '¿Disfrutas el trato con clientes, los idiomas y organizar viajes?' },
  { id: 12, categoria: 'EDUCACION', texto: '¿Eres bueno planificando actividades y motivando a grupos?' },
  { id: 13, categoria: 'TIC', texto: '¿Te interesa la ciberseguridad y el manejo de datos digitales?' },
  { id: 14, categoria: 'NEGOCIOS', texto: '¿Te sientes cómodo gestionando proyectos empresariales?' },
  { id: 15, categoria: 'SALUD', texto: '¿Eres detallista, preciso y tienes un alto sentido ético?' },
  { id: 16, categoria: 'INGENIERIA', texto: '¿Te gusta innovar en procesos de manufactura o construcción?' }
];

export default function App() {
  const [estado, setEstado] = useState('INICIO');
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [puntajes, setPuntajes] = useState({});
  const [animarSalida, setAnimarSalida] = useState(false);

  // Preload logo
  useEffect(() => {
    const img = new Image();
    img.src = LOGO_URL;
  }, []);

  const iniciarTest = () => {
    setEstado('TEST');
    setIndicePregunta(0);
    const puntajesIniciales = Object.keys(CATEGORIAS).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});
    setPuntajes(puntajesIniciales);
  };

  const responder = (valor) => {
    // FIX: Prevenir doble clic durante la animación
    if (animarSalida) return;
    
    setAnimarSalida(true);
    
    // Delay pequeño para la animación de salida
    setTimeout(() => {
      const preguntaActual = PREGUNTAS[indicePregunta];
      
      // Safety check
      if (!preguntaActual) {
         setEstado('RESULTADO');
         setAnimarSalida(false);
         return;
      }

      const cat = preguntaActual.categoria;

      setPuntajes(prev => ({
        ...prev,
        [cat]: (prev[cat] || 0) + valor
      }));

      if (indicePregunta < PREGUNTAS.length - 1) {
        setIndicePregunta(prev => prev + 1);
        setAnimarSalida(false);
      } else {
        setEstado('RESULTADO');
        setAnimarSalida(false);
      }
    }, 300);
  };

  const reiniciar = () => {
    setEstado('INICIO');
    setIndicePregunta(0);
    setPuntajes({});
  };

  const obtenerResultados = () => {
    const resultadosOrdenados = Object.entries(puntajes).sort(([,a], [,b]) => b - a);
    
    // Safety fallback si no hay resultados
    if (resultadosOrdenados.length === 0) return { ganador: CATEGORIAS.EDUCACION, todos: [] };

    const maxPuntaje = resultadosOrdenados[0][1];
    const ganadores = resultadosOrdenados.filter(([,pts]) => pts === maxPuntaje);
    
    return {
      ganador: CATEGORIAS[ganadores[0][0]],
      todos: resultadosOrdenados
    };
  };

  // --- COMPONENTES UI ---

  // Pantalla Inicio
  if (estado === 'INICIO') {
    return (
      <div className="min-h-screen bg-slate-50 overflow-hidden relative font-sans">
        <style>{styles}</style>
        
        {/* Fondo decorativo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-10 max-w-xl w-full text-center animate-enter transform hover:scale-[1.01] transition-transform duration-500">
            
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-white rounded-2xl shadow-md flex items-center justify-center">
                 <img src={LOGO_URL} alt="Logo" className="h-16 object-contain" />
              </div>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100">
              Descubre tu futuro profesional
            </div>

            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              Test Vocacional <span className="text-blue-600">Inteligente</span>
            </h1>
            
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Analizamos tus habilidades en 11 áreas clave para conectarte con tu carrera ideal. 
              <br/><span className="text-sm text-slate-500 mt-2 block">(Toma menos de 3 minutos)</span>
            </p>

            <button 
              onClick={iniciarTest}
              className="group w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-3 text-lg"
            >
              Comenzar Ahora
              <div className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          </div>
          
          <p className="mt-8 text-slate-400 text-sm font-medium">© Empleo Conecta RH 2025</p>
        </div>
      </div>
    );
  }

  // Pantalla Test
  if (estado === 'TEST') {
    const pregunta = PREGUNTAS[indicePregunta];
    
    // FIX: Safety check por si el índice se desborda
    if (!pregunta) return null;

    const progreso = ((indicePregunta + 1) / PREGUNTAS.length) * 100;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col relative font-sans">
        <style>{styles}</style>
        
        {/* Header de progreso */}
        <div className="bg-white shadow-sm sticky top-0 z-20 px-6 py-4">
          <div className="max-w-3xl mx-auto w-full flex items-center justify-between gap-4">
            <img src={LOGO_URL} alt="Logo" className="h-8 object-contain opacity-80" />
            
            <div className="flex-1 max-w-md mx-4">
               <div className="flex justify-between text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">
                <span>Progreso</span>
                <span>{Math.round(progreso)}%</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                  style={{ width: `${progreso}%` }}
                />
              </div>
            </div>

            <div className="text-sm font-medium text-slate-500 whitespace-nowrap hidden sm:block">
              {indicePregunta + 1} / {PREGUNTAS.length}
            </div>
          </div>
        </div>

        {/* Contenido Central */}
        <div className="flex-1 flex items-center justify-center p-4 pb-20">
          <div className={`max-w-2xl w-full transition-all duration-300 ${animarSalida ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0 animate-enter'}`}>
            
            {/* Tarjeta de Pregunta */}
            <div className="text-center mb-10">
               <span className="inline-block px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold tracking-wider uppercase mb-4 border border-blue-100">
                 Pregunta {indicePregunta + 1}
               </span>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
                 {pregunta.texto}
               </h2>
            </div>

            {/* Opciones */}
            <div className="grid gap-4">
              <button 
                onClick={() => responder(3)}
                disabled={animarSalida}
                className="group relative overflow-hidden bg-white p-5 rounded-2xl border-2 border-slate-100 hover:border-blue-500 transition-all duration-200 hover:shadow-lg hover:shadow-blue-100 text-left flex items-center gap-5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-blue-50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="relative z-10">
                  <span className="block text-lg font-bold text-slate-700 group-hover:text-blue-800 transition-colors">Sí, totalmente</span>
                  <span className="text-sm text-slate-500 group-hover:text-blue-600">Me identifica mucho</span>
                </div>
              </button>

              <button 
                onClick={() => responder(1)}
                disabled={animarSalida}
                className="group relative overflow-hidden bg-white p-5 rounded-2xl border-2 border-slate-100 hover:border-slate-400 transition-all duration-200 hover:shadow-lg hover:shadow-slate-100 text-left flex items-center gap-5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-slate-50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-slate-500 group-hover:text-white transition-colors duration-200 shrink-0">
                  <div className="w-3 h-3 bg-current rounded-full"></div>
                </div>
                <div className="relative z-10">
                  <span className="block text-lg font-bold text-slate-700 group-hover:text-slate-800 transition-colors">Más o menos</span>
                  <span className="text-sm text-slate-500">Es algo neutral para mí</span>
                </div>
              </button>

              <button 
                onClick={() => responder(0)}
                disabled={animarSalida}
                className="group relative overflow-hidden bg-white p-5 rounded-2xl border-2 border-slate-100 hover:border-red-300 transition-all duration-200 hover:shadow-lg hover:shadow-red-50 text-left flex items-center gap-5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-red-50 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors duration-200 shrink-0">
                  <span className="text-xl font-bold">×</span>
                </div>
                <div className="relative z-10">
                  <span className="block text-lg font-bold text-slate-700 group-hover:text-red-800 transition-colors">No me interesa</span>
                  <span className="text-sm text-slate-500 group-hover:text-red-600">En desacuerdo</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla Resultado
  if (estado === 'RESULTADO') {
    const { ganador, todos } = obtenerResultados();

    return (
      <div className="min-h-screen bg-slate-100 py-12 px-4 font-sans">
        <style>{styles}</style>
        <div className="max-w-5xl mx-auto animate-enter">
          
          {/* Header Logo */}
          <div className="flex justify-center mb-10">
             <img src={LOGO_URL} alt="Logo" className="h-14 object-contain opacity-90 grayscale hover:grayscale-0 transition-all duration-500" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* COLUMNA IZQUIERDA: TARJETA GANADORA (Ocupa 2 columnas en desktop) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white/50 relative group">
                
                {/* Banner Superior */}
                <div className={`h-32 w-full ${ganador.bg} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/5"></div>
                  {/* Pattern de fondo abstracto */}
                  <div className="absolute right-0 top-0 p-10 opacity-10 transform rotate-12 scale-150">
                    {ganador.icon}
                  </div>
                </div>

                {/* Contenido Principal */}
                <div className="px-8 pb-10 relative">
                  {/* Icono Flotante */}
                  <div className="absolute -top-16 left-8 w-32 h-32 bg-white rounded-3xl shadow-xl p-6 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 border-4 border-white">
                    <div className={ganador.color}>
                      {ganador.icon}
                    </div>
                  </div>

                  <div className="pt-20">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold text-slate-400 tracking-wider uppercase">Tu Resultado Ideal</span>
                    </div>
                    
                    <h1 className="text-4xl font-extrabold text-slate-800 mb-4 leading-tight">
                      {ganador.nombre}
                    </h1>
                    
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed font-light">
                      "{ganador.descripcion}"
                    </p>
                    
                    {/* Sección Habilidades */}
                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg">
                        <Award className={`w-5 h-5 ${ganador.color}`} />
                        Tus Superpoderes:
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {ganador.habilidades.map((hab, i) => (
                          <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                            <span className="text-slate-700 font-medium text-sm">{hab}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sección Carreras */}
                    <div>
                      <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-slate-400" />
                        Carreras Sugeridas:
                      </h3>
                      <p className="text-slate-600 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-lg">
                        {ganador.carreras}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: RESUMEN Y REINICIAR */}
            <div className="space-y-6 animate-slide-in" style={{animationDelay: '0.2s'}}>
              
              {/* Tarjeta de Gráfico */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Afinidades Secundarias</h3>
                <div className="space-y-5">
                  {todos.slice(1, 6).map(([key, puntaje], index) => {
                    const cat = CATEGORIAS[key];
                    const maxScore = todos[0][1];
                    const porcentaje = maxScore > 0 ? (puntaje / maxScore) * 100 : 0;
                    
                    return (
                      <div key={key} className="group">
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="font-semibold text-slate-700 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${cat.bg.replace('bg-', 'bg-slate-400 ')}`}></div> 
                            {cat.nombre}
                          </span>
                          <span className="text-slate-400 font-medium">{puntaje} pts</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${index === 0 ? 'bg-slate-400' : 'bg-slate-300'}`}
                            style={{ width: `${porcentaje}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botón CTA */}
              <div className="bg-blue-600 rounded-3xl shadow-xl p-8 text-center text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                
                <h3 className="text-xl font-bold mb-2 relative z-10">¿No estás seguro?</h3>
                <p className="text-blue-100 text-sm mb-6 relative z-10">Puedes volver a intentar el test para confirmar tus resultados.</p>
                
                <button 
                  onClick={reiniciar}
                  className="w-full bg-white text-blue-700 font-bold py-4 px-6 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 relative z-10 shadow-lg"
                >
                  <RotateCcw className="w-5 h-5" />
                  Repetir Test
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

