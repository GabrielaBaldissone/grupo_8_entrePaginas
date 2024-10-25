-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 25-10-2024 a las 18:02:43
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `entre_paginas`
--
CREATE DATABASE IF NOT EXISTS `entre_paginas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `entre_paginas`;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`id_book`, `name`, `author`, `description`, `image`, `price`, `stock`, `id_category`) VALUES
(1, 'Cadáver exquisito', 'Agustina Bazterrica', 'Distopía sobre la deshumanización y la crueldad en sociedad moderna.', 'cadaver_exquisito.jpg', '28599.00', 50, 4),
(2, 'El extranjero', 'Albert Camus', 'El extranjero de Albert Camus sigue a Meursault, un hombre apático e indiferente, cuya vida cambia tras un acto impulsivo en la costa de Argelia. La novela explora temas de absurdo, alienación y el sinsentido de la existencia, planteando preguntas sobre la moralidad y el juicio en una sociedad que se aferra a convenciones incomprensibles para el protagonista.', 'el_extranjero.jpg', '12899.00', 20, 4),
(3, 'La economía circular', 'Franck Aggeri', '\r\n\"La economía circular\" de Franck Aggeri examina cómo el modelo de economía circular transforma la producción y el consumo al promover la reutilización, reciclaje y optimización de recursos. Aggeri explora ejemplos prácticos y analiza cómo este enfoque económico puede reducir el impacto ambiental y ofrecer soluciones sostenibles frente a la economía lineal tradicional.', 'economia_circular.jpg', '22900.00', 12, 2),
(4, 'Macroeconomía', 'Gregory Mankiw', 'El libro Macroeconomía de Gregory Mankiw explora los principios fundamentales de la economía a gran escala, incluyendo el análisis del crecimiento económico, la inflación, el desempleo y las políticas fiscales y monetarias. A través de un enfoque claro y accesible, Mankiw presenta teorías macroeconómicas esenciales, utilizando ejemplos actuales y análisis de modelos económicos para ayudar a los lectores a comprender el funcionamiento de las economías modernas.', 'macroeconomia.jpg', '58212.00', 9, 2),
(5, 'Obra completa IV - Del psicoanálisis a la psicología social', 'Enrique Pichon Riviere', '\r\n\"Obra completa IV - Del psicoanálisis a la psicología social\" de Enrique Pichon Riviere explora la evolución del pensamiento psicoanalítico hacia la psicología social. A través de un enfoque integrador, el autor analiza la interrelación entre individuo y sociedad, abordando conceptos clave como la comunicación y el grupo. Su obra invita a reflexionar sobre la influencia del contexto social en la construcción de la subjetividad y el bienestar psicológico.', 'obra_completa.jpg', '44900.00', 33, 3),
(6, 'Libro de la psicología', 'Wade Pickren', 'La obra de Wade Pickren ofrece una exploración accesible y completa de la evolución de la psicología como disciplina. A través de un enfoque claro y conciso, se analizan teorías, métodos y figuras clave que han dado forma a nuestra comprensión de la mente y el comportamiento humano. Es una guía esencial tanto para estudiantes como para cualquier persona interesada en los fundamentos de la psicología moderna.', 'libro_psicologia.jpg', '48000.00', 25, 3),
(7, 'Programación básica', 'Leonel Figueroa', 'Leonel Figueroa introduce los conceptos fundamentales de la programación de manera clara y accesible. A través de ejemplos prácticos y ejercicios, se enseña a los lectores a desarrollar habilidades básicas en distintos lenguajes de programación. Ideal para principiantes, este libro proporciona una base sólida para aquellos que desean adentrarse en el mundo de la programación y desarrollar su pensamiento lógico y creativo.', 'programacion_basica.jpg', '14490.00', 45, 1),
(8, 'Java, programación orientada a objetos', 'Andres Juarez', 'Introducción a los conceptos fundamentales de la programación orientada a objetos utilizando Java. A través de explicaciones claras y ejemplos prácticos, se abordan temas como clases, objetos, herencia y polimorfismo. Este enfoque permite a los lectores desarrollar habilidades sólidas en la creación de aplicaciones eficientes y estructuradas, haciendo de esta guía un recurso valioso para principiantes y programadores en busca de afianzar sus conocimientos en el lenguaje.', 'javapoo.jpg', '19900.00', 15, 1),
(9, 'La educación ayer, hoy y mañana', 'Silvina Gvirtz', 'Análisis profundo sobre la evolución de la educación a lo largo del tiempo, examinando sus desafíos y transformaciones. A través de un enfoque crítico, se abordan temas clave como las políticas educativas, el papel de la tecnología y las metodologías de enseñanza. Este texto es una reflexión esencial para entender el presente y el futuro del sistema educativo en un mundo en constante cambio.', 'educacion_ayer_hoy_manana.jpg', '22260.00', 52, 5),
(10, 'Enseñar distinto', 'Melina Furman', '¿Cuánto tiempo hemos dedicado a estudiar y enseñar temas que no entendemos completamente? Muchas veces, el trabajo escolar produce conocimiento inerte que no sabemos aplicar. ¿Cómo podemos evitar esto y dar herramientas a estudiantes para aprender de por vida? Con el enfoque en el aprendizaje profundo, se proponen estrategias y ejemplos que traducen teoría en consejos prácticos. Promover la metacognición y la evaluación bien pensada son esenciales para mejorar la enseñanza y potenciar a los docentes en su labor transformadora.', 'ensenar_distinto.jpg', '32990.00', 9, 5),
(11, 'La vida feliz', 'David Foenkinos', 'En medio de un deseo de cambio, Éric Kherson, un director comercial divorciado y padre ausente, enfrenta una crisis personal. Acepta un puesto en el gobierno tras una oferta de una amiga, pero su felicidad es efímera. En un viaje a Seúl, se siente cada vez peor hasta que descubre la tienda Happy Life, que ofrece funerales falsos. Esta peculiar propuesta podría cambiar su vida para siempre, planteando una reflexión sobre el éxito y la muerte.', 'vida_feliz.jpg', '25999.00', 27, 4),
(12, 'Todo pueblo es cicatriz', 'Hiram Ruvalcaba', 'En 1996, Sagrario fue asesinada frente a su casa, lo que alertó a Hiram, un niño de ocho años. Cuatro años después, Rocío también fue víctima de la violencia, y en 2005, el asesinato de Antonio, el tío del autor, quebró la frontera entre lo noticioso y lo personal. A partir de estas tragedias, Hiram Ruvalcaba entreteje una novela debut que refleja el dolor y la herencia de violencia en su familia, posicionándolo como un digno heredero de Rulfo y Arreola. La crítica destaca su habilidad para convertir el sufrimiento en historias que, a pesar de su crudeza, encuentran belleza.', 'pueblo_cicatriz.jpg', '25999.00', 16, 4),
(13, 'Curso de algoritmos y programación a fondo', 'Pablo Augusto Sznajdleder', '\r\nEsta obra de Pablo Augusto Sznajleder ofrece una profunda inmersión en el mundo de los algoritmos y la programación, centrándose en implementaciones en C++. A través de explicaciones claras y ejemplos prácticos, el autor guía al lector en el desarrollo de habilidades esenciales para resolver problemas complejos. Ideal para estudiantes y profesionales, este recurso se convierte en una herramienta valiosa para quienes buscan fortalecer su comprensión en programación y algoritmos.', 'pueblo_cicatriz.jpg', '29944.00', 0, 1),
(14, 'Desarrollo de aplicaciones web con php', 'Manuel Torres Remon', 'PHP es uno de los lenguajes de programación web más usados en la actualidad, que (como Visual o Java) combina su código con HTML5, implementando aplicaciones dinámicas de manera profesional. Entre sus características más relevantes, podemos afirmar que se trata de un lenguaje multi-plataforma que puede ser ejecutado en todos los dispositivos que tengan la suficiente capacidad para conectarse a cualquier base de datos. Asimismo, es considerado como un software libre, ya que puede ser usado en cualquier ámbito. Esta obra tiene como objetivo ayudar a comprender cómo se compone una aplicación desde la tecnología presentada por PHP. No necesita conocimientos de otros lenguajes de programación, ya que se proponen casos desarrollados que van desde lo más básico hasta locomplejo.', 'pueblo_cicatriz.jpg', '37131.50', 8, 1),
(15, 'El hombre y sus símbolos', 'Carl Jung', 'Esta es la primera y unica obra de Carl G.Jung, el famoso psicologo suizo, dedicada a explicar a los lectores cual fue su mayor contribucion al conocimiento de la mente humana: la teoria del simbolismo y,en especial,el papel que esta desempea en los sueos.El autor no se dedica solo a subrayar que el hombre unicamente podra alcanzar su plenitud conociendo y aceptando el inconsciente , es decir, analizando los sueos y sus simbolos;sino tambien a demostrar que todo sueo es un mensaje directo personal y significativo que utiliza los simbolos comunes a toda la humanidad de una forma totalmente individualizada, que a su vez debe interpretarse mediante una clave tambien individual.Acompaado de mas de quinientas ilustraciones que proporcionan un comentario rapido y excepcional del pensamiento del autor y a partir del analisis de la naturaleza y la funcion de los sueos,eb El hombre y sus simbolos Jung explora,entreotras cosas,el significado simbolico del arte contemporaneo y los significados psicologicos de las experiencias mas corrientes de la vida cotidiana.', 'hombre_simbolos.jpg', '79600.00', 4, 3),
(16, 'Como recuperar la capacidad de atención', 'Gloria Mark', 'La psicóloga Gloria Mark revela cómo la tecnología afecta nuestra capacidad de atención y presenta un nuevo enfoque para entender el funcionamiento del cerebro en el mundo digital. Pasamos un promedio de 47 segundos en una pantalla antes de desviarnos, y nos interrumpimos más a menudo que otros nos interrumpen. En su obra, Mark desmitifica conceptos erróneos sobre la multitarea y el uso de redes sociales, ofreciendo estrategias para mejorar la concentración y el bienestar diario.', 'capacidad_atencion.jpg', '31800.00', 15, 3),
(17, 'Fundamentos de economía', 'Paul Krugman', 'Principios fundamentales de la economía de manera accesible y clara. A través de ejemplos contemporáneos y análisis concisos, se exploran conceptos clave como la oferta, la demanda y el papel de los mercados. Este texto resulta esencial tanto para estudiantes como para cualquier persona interesada en comprender los mecanismos económicos que influyen en la vida cotidiana y las decisiones políticas.', 'fundamentos_economia.jpg', '60140.00', 74, 2),
(18, 'La mejor manera de invertir', 'Alejandro Daniel Romero Maidana', '¿Cómo se elige la empresa correcta para operar en la bolsa? ¿Por análisis fundamental o por análisis técnico? ¿Cuándo comprar y vender los activos? ¿Qué mueve las cotizaciones? ¿Cuál es la mejor manera de invertir? El autor reúne en este libro las dos principales escuelas de inversión en la actividad bursátil, el Análisis Fundamental y el Análisis Técnico, por medio de un original método de aplicación conjunta y simultánea. Con ejemplos reales, reflexiones y conceptos clave, explica cómo se elige la empresa por fundamentos y cómo se la opera con herramientas técnicas y gráficas. Demuestra que la rigurosidad en el procedimiento y en los recursos utilizados logra resultados estadísticos positivos verificables por el lector a través de la web. Todo esto sustentado en una lectura amigable, comprensible y dinámica, característica principal de Alejandro Romero Maidana en sus anteriores trabajos convertidos en long sellers bursátiles.', 'mejor_manera_invertir.jpg', '25199.00', 47, 2),
(19, 'Escribir textos científicos y académicos', 'Marta Marin', 'Herramientas prácticas y estrategias efectivas para la redacción de textos científicos y académicos. Aborda desde la estructura y estilo hasta la importancia de la claridad y precisión en la comunicación escrita. Ideal para estudiantes y profesionales, proporciona consejos sobre cómo presentar ideas de manera coherente y persuasiva, facilitando el proceso de escritura en contextos académicos y de investigación.', 'escribir_textos.jpg', '18800.00', 33, 5),
(20, 'El cerebro matemático', 'Stanislas Dehaene', '¿De dónde vienen realmente los números y cómo llegan a nuestra mente? Este libro explora el \"sentido del número\", la capacidad innata para representar y entender cantidades. Stanislas Dehaene inicia su análisis con la habilidad de animales y bebés para reconocer magnitudes, y examina casos de lesiones cerebrales que afectan el cálculo. También investiga la influencia del lenguaje en las matemáticas y el origen de los números, revelando el papel biológico del cerebro en las operaciones matemáticas.', 'cerebro_matematico.jpg', '34690.00', 0, 5),
(21, 'Educar para la vida', 'Pepe Menendez', 'Como crear la escuela que soamos, en el mundo en que vivimos? Como hacer que la diversidad y la ilusion en la escuela sean parte de su riqueza y no una fuente de sufrimiento y frustraciones? Este libro busca dar respuesta a estas preguntas con una mirada humanista. Pepe nos recuerda que la escuela puede ser ese lugar en el que una mirada amorosa nos habilite a ir mas lejos de lo quecreimos posible. Este libro devuelve a la escuela la mision de formar para una vida con mas oportunidades. Un libro para docentes, directivos y pedagogos interesados en pensar la educacion desde un humanismo del siglo XXI.', 'educar_para_vida.jpg', '20890.00', 8, 5),
(22, 'Montessori para bebés', 'Charlotte Poussin', 'Enfoque innovador para el desarrollo infantil en los primeros años de vida. A través de principios montessorianos, se exploran actividades y entornos que fomentan la autonomía, la curiosidad y el aprendizaje natural en los bebés. Con consejos prácticos y ejemplos, este libro es una guía valiosa para padres y educadores que buscan crear experiencias enriquecedoras para los más pequeños.', 'montessori_bebes.jpg', '38990.00', 12, 5),
(23, '1984', 'George Orwel', '\r\nEn una sociedad distópica, un hombre lucha por mantener su individualidad bajo un régimen totalitario que controla cada aspecto de la vida. Atrapado en un mundo de vigilancia constante y propaganda, comienza a cuestionar la realidad y su lugar en ella. Su búsqueda de verdad y libertad lo lleva a enfrentarse a las consecuencias de desafiar un sistema opresivo que busca eliminar cualquier forma de disidencia.', '1984.jpg', '16900.00', 20, 4),
(24, 'La naranja mecánica', 'Anthony Burgess', 'Al quinceaero Alex le gustan los latigazos de ultraviolencia. Junto a su pandilla de amigos, roban, matan y violan en un futuro de pesadilla, hasta que el Estado pone fin a sus desmanes. Pero que significara para el su reeducacion? La naranja mecanica es un horror distpico,una comedia negra,una exploracion de la capacidad de eleccion pero tambien es una obra llena de invencion donde se creo un nuevo lenguaje para sus personajes. La naranja mecnica es un clsico de culto de la ciencia ficcin. Una obra digna de aparecer en nuestra coleccin Minotauro Esenciales.', 'naranja_mecanica.jpg', '27600.00', 14, 4),
(25, 'Terapia cognitivo conductual en 7 semanas', 'Seth J. Gillihan', 'En esta guía práctica, Seth J. Gillihan ofrece un enfoque estructurado para aplicar la terapia cognitivo-conductual en un plazo de siete semanas. A través de ejercicios y estrategias claras, los lectores aprenderán a identificar y cambiar patrones de pensamiento negativos, mejorando su bienestar emocional. Es una herramienta accesible para quienes buscan transformar su forma de pensar y enfrentar desafíos psicológicos de manera efectiva.', 'terapia_conductual.jpg', '40990.00', 35, 3),
(26, 'Apego y desarrollo a lo largo de la vida', 'Arturo Ezquerro', '\r\nLa obra de Arturo Ezquerro examina cómo el apego influye en el desarrollo humano a lo largo de la vida, destacando su importancia no solo en relaciones individuales, sino también en contextos grupales. A través de un enfoque interdisciplinario, se analizan las dinámicas de apego y su impacto en la salud emocional, la cohesión social y el bienestar, ofreciendo valiosas perspectivas sobre la conexión humana en diferentes etapas de la vida.', 'apego_desarrollo.jpg', '14717.00', 15, 3),
(27, 'Historia económica de la Argentina en el sigo XIX', 'Roy Hora', 'Aspectos económicos clave que moldearon a Argentina durante el siglo XIX. A través de un análisis detallado de políticas, conflictos y transformaciones sociales, se revela cómo estos elementos influyeron en el desarrollo del país. Este estudio proporciona una comprensión profunda de las dinámicas económicas y sus repercusiones en la historia nacional, siendo una referencia valiosa para estudiantes y entusiastas de la historia argentina.', 'historia_economica_arg.jpg', '27490.00', 5, 2),
(28, 'Finanzas básicas', 'Harvard Business Review', 'Finanzas básicas explica los principios fundamentales de las finanzas de manera simple y rápida, y te presenta las claves para: Interpretar adecuadamente los estados financieros. Sopesar los costes y los beneficios. Elaborar presupuestos y hacer previsiones. Evaluar la salud financiera de una empresa.', 'finanzas_basicas.jpg', '15536.00', 24, 2),
(29, 'Lenguaje ensamblador', 'Oswaldo Casazola', 'Conceptos fundamentales del lenguaje ensamblador, explorando su estructura y funcionamiento. Con un enfoque didáctico, el autor guía a los lectores a través de ejemplos prácticos y explicaciones claras, facilitando la comprensión de la programación a bajo nivel. Ideal para estudiantes y entusiastas de la informática, este libro es una herramienta valiosa para quienes desean profundizar en la lógica y la eficiencia de la programación en ensamblador.', 'lenguaje_ensamblador.jpg', '18980.50', 8, 1),
(30, 'Desarrollo de aplicaciones móviles con Android', 'Manuel Torres Remon', 'Guía práctica para aprender a desarrollar aplicaciones móviles en Android. Abarca desde los conceptos básicos hasta técnicas avanzadas, proporcionando ejemplos claros y ejercicios prácticos. El autor aborda temas como la interfaz de usuario, la gestión de datos y la integración de servicios, lo que permite a los lectores adquirir las habilidades necesarias para crear aplicaciones funcionales y atractivas en esta plataforma.', 'android.jpg', '41273.00', 14, 1);

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id_category`, `category`) VALUES
(1, 'Programación'),
(2, 'Economía'),
(3, 'Psicología'),
(4, 'Ficción'),
(5, 'Educación');

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id_order`, `id_user`, `available`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 0),
(5, 5, 1),
(6, 6, 1),
(7, 7, 0),
(8, 8, 1),
(9, 9, 1),
(10, 10, 1),
(11, 1, 0),
(12, 2, 1),
(13, 3, 0),
(14, 4, 1),
(15, 5, 1);

--
-- Volcado de datos para la tabla `order_book`
--

INSERT INTO `order_book` (`id_order_book`, `id_order`, `id_book`, `quantity`, `price`, `date`) VALUES
(1, 1, 1, 2, '57198.00', '2024-10-01'),
(2, 1, 12, 1, '25999.00', '2024-10-01'),
(3, 2, 13, 3, '89832.00', '2024-10-02'),
(4, 2, 4, 1, '58212.00', '2024-10-02'),
(5, 3, 10, 1, '32990.00', '2024-10-03'),
(6, 3, 6, 2, '96000.00', '2024-10-03'),
(7, 4, 17, 1, '60140.00', '2024-10-04'),
(8, 5, 8, 5, '99500.00', '2024-10-05'),
(9, 6, 19, 1, '18800.00', '2024-10-06'),
(10, 6, 30, 2, '82546.00', '2024-10-06'),
(11, 7, 11, 1, '25999.00', '2024-10-07'),
(12, 8, 22, 3, '116970.00', '2024-10-08'),
(13, 9, 2, 2, '25798.00', '2024-10-09'),
(14, 10, 14, 2, '74263.00', '2024-10-10'),
(15, 11, 15, 1, '79600.00', '2024-10-11');

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `first_name`, `last_name`, `email`, `phone`, `password`, `rol`) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@example.com', '555-1234', 'hashed_password1', 'cliente'),
(2, 'Ana', 'García', 'ana.garcia@example.com', '555-5678', 'hashed_password2', 'cliente'),
(3, 'Pedro', 'Martínez', 'pedro.martinez@example.com', '555-9876', 'hashed_password3', 'cliente'),
(4, 'Laura', 'Fernández', 'laura.fernandez@example.com', '555-4321', 'hashed_password4', 'cliente'),
(5, 'Carlos', 'López', 'carlos.lopez@example.com', '555-8765', 'hashed_password5', 'cliente'),
(6, 'Marta', 'Gómez', 'marta.gomez@example.com', '555-3456', 'hashed_password6', 'cliente'),
(7, 'Sofía', 'Rodríguez', 'sofia.rodriguez@example.com', '555-6543', 'hashed_password7', 'cliente'),
(8, 'Luis', 'Ramírez', 'luis.ramirez@example.com', '555-7890', 'hashed_password8', 'cliente'),
(9, 'Jorge', 'Morales', 'jorge.morales@example.com', '555-1234', 'hashed_password10', 'cliente'),
(10, 'Gabriela', 'Sánchez', 'gabriela.sanchez@example.com', '555-4321', 'hashed_password9', 'cliente'),
(11, 'admin', 'admin', 'admin@example.com', '46527821', 'admin2024', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
