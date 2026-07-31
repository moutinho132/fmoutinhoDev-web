import { NextRequest, NextResponse } from "next/server";

// Ejercicios predefinidos para cada lenguaje
const exercises: Record<string, Record<string, { exercise: string; starterCode: string }>> = {
  java: {
    "Clases y Objetos": {
      exercise: `## Clases y Objetos en Java

**Objetivo:** Crea una clase \`Persona\` con los siguientes atributos y métodos:

### Requisitos:
1. Atributos privados: \`nombre\` (String), \`edad\` (int), \`email\` (String)
2. Constructor que inicialice todos los atributos
3. Métodos getters y setters para cada atributo
4. Método \`presentarse()\` que retorne: "Hola, soy [nombre] y tengo [edad] años"
5. Método \`esMayorDeEdad()\` que retorne true si edad >= 18

### Ejemplo de uso:
\`\`\`java
Persona persona = new Persona("Fernando", 35, "fernando@email.com");
System.out.println(persona.presentarse()); // "Hola, soy Fernando y tengo 35 años"
System.out.println(persona.esMayorDeEdad()); // true
\`\`\``,
      starterCode: `public class Persona {
    // TODO: Define los atributos privados
    
    // TODO: Crea el constructor
    
    // TODO: Implementa getters y setters
    
    // TODO: Implementa el método presentarse()
    
    // TODO: Implementa el método esMayorDeEdad()
}`,
    },
    "ArrayList y Colecciones": {
      exercise: `## ArrayList y Colecciones en Java

**Objetivo:** Gestiona una lista de estudiantes usando ArrayList.

### Requisitos:
1. Crea una clase \`Estudiante\` con \`nombre\` y \`nota\`
2. Crea una clase \`GestorEstudiantes\` con un ArrayList de Estudiante
3. Implementa métodos para:
   - \`agregarEstudiante(Estudiante e)\`
   - \`eliminarEstudiante(String nombre)\`
   - \`buscarPorNombre(String nombre)\`
   - \`calcularPromedio()\` - retorna el promedio de notas
   - \`listarAprobados(double notaMinima)\` - retorna lista de aprobados`,
      starterCode: `import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

class Estudiante {
    // TODO: Define atributos y constructor
}

class GestorEstudiantes {
    private ArrayList<Estudiante> estudiantes;
    
    public GestorEstudiantes() {
        estudiantes = new ArrayList<>();
    }
    
    // TODO: Implementa los métodos requeridos
}`,
    },
    "Patrón Singleton": {
      exercise: `## Patrón de Diseño Singleton

**Objetivo:** Implementa el patrón Singleton para un logger.

### Requisitos:
1. Clase \`Logger\` que solo pueda tener una instancia
2. Método estático \`getInstance()\`
3. Método \`log(String mensaje)\` que imprima con timestamp
4. La instancia debe ser thread-safe`,
      starterCode: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Logger {
    // TODO: Implementa el patrón Singleton thread-safe
    
    // TODO: Implementa el método log(String mensaje)
}`,
    },
  },
  python: {
    "Listas y Diccionarios": {
      exercise: `## Listas y Diccionarios en Python

**Objetivo:** Crea un sistema de inventario usando estructuras de datos.

### Requisitos:
1. Diccionario \`inventario\` donde la clave es el nombre del producto
2. Cada producto tiene: \`precio\`, \`cantidad\`, \`categoria\`
3. Funciones:
   - \`agregar_producto(nombre, precio, cantidad, categoria)\`
   - \`actualizar_cantidad(nombre, nueva_cantidad)\`
   - \`calcular_valor_total()\` - retorna el valor total del inventario
   - \`productos_por_categoria(categoria)\` - retorna lista de productos
   - \`producto_mas_caro()\` - retorna el producto más caro`,
      starterCode: `# Sistema de Inventario
inventario = {}

def agregar_producto(nombre, precio, cantidad, categoria):
    """Agrega un producto al inventario"""
    # TODO: Implementar
    pass

def actualizar_cantidad(nombre, nueva_cantidad):
    """Actualiza la cantidad de un producto"""
    # TODO: Implementar
    pass

def calcular_valor_total():
    """Calcula el valor total del inventario"""
    # TODO: Implementar
    pass

def productos_por_categoria(categoria):
    """Retorna productos de una categoría"""
    # TODO: Implementar
    pass

def producto_mas_caro():
    """Encuentra el producto más caro"""
    # TODO: Implementar
    pass`,
    },
    "Funciones y Lambdas": {
      exercise: `## Funciones y Lambdas en Python

**Objetivo:** Domina las funciones y expresiones lambda.

### Requisitos:
1. Función \`procesar_lista(lista, funcion)\` que aplica una función a cada elemento
2. Lambda que duplique números
3. Lambda que convierta strings a mayúsculas
4. Función \`filtrar_y_transformar(lista, filtro, transformacion)\`
5. Usa \`map\`, \`filter\` y \`reduce\``,
      starterCode: `from functools import reduce

def procesar_lista(lista, funcion):
    """Aplica una función a cada elemento de la lista"""
    # TODO: Implementar usando map
    pass

# Lambda para duplicar números
duplicar = None  # TODO: Definir lambda

# Lambda para mayúsculas
a_mayusculas = None  # TODO: Definir lambda

def filtrar_y_transformar(lista, filtro, transformacion):
    """Filtra elementos y luego los transforma"""
    # TODO: Implementar usando filter y map
    pass

# Ejemplo de uso:
# numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# resultado = filtrar_y_transformar(numeros, lambda x: x % 2 == 0, duplicar)
# print(resultado)  # [4, 8, 12, 16, 20]`,
    },
    "Decoradores": {
      exercise: `## Decoradores en Python

**Objetivo:** Crea decoradores para modificar el comportamiento de funciones.

### Requisitos:
1. Decorador \`@medir_tiempo\` que mida cuánto tarda una función
2. Decorador \`@reintentar(n)\` que reintente n veces si hay excepción
3. Decorador \`@log_ejecucion\` que registre cuándo se ejecuta una función
4. Aplica los decoradores a funciones de ejemplo`,
      starterCode: `import time
import functools
from datetime import datetime

def medir_tiempo(func):
    """Decorador que mide el tiempo de ejecución"""
    # TODO: Implementar
    pass

def reintentar(n):
    """Decorador que reintenta n veces si hay excepción"""
    # TODO: Implementar (es un decorador con parámetros)
    pass

def log_ejecucion(func):
    """Decorador que registra la ejecución"""
    # TODO: Implementar
    pass

# Ejemplo de uso:
@medir_tiempo
@log_ejecucion
def operacion_lenta():
    time.sleep(1)
    return "Completado"

@reintentar(3)
def operacion_riesgosa():
    import random
    if random.random() < 0.7:
        raise ValueError("Falló")
    return "Éxito"`,
    },
  },
  php: {
    "Arrays y Funciones": {
      exercise: `## Arrays y Funciones en PHP

**Objetivo:** Manipula arrays con funciones nativas de PHP.

### Requisitos:
1. Array asociativo de productos con \`nombre\`, \`precio\`, \`stock\`
2. Funciones:
   - \`filtrar_por_precio($productos, $min, $max)\` - usar array_filter
   - \`ordenar_por_precio($productos)\` - usar usort
   - \`calcular_total_stock($productos)\` - usar array_reduce
   - \`nombres_productos($productos)\` - usar array_map
   - \`agrupar_por_categoria($productos)\` - agrupar arrays`,
      starterCode: `<?php

$productos = [
    ['nombre' => 'Laptop', 'precio' => 999.99, 'stock' => 10, 'categoria' => 'electrónica'],
    ['nombre' => 'Mouse', 'precio' => 29.99, 'stock' => 50, 'categoria' => 'electrónica'],
    ['nombre' => 'Teclado', 'precio' => 79.99, 'stock' => 30, 'categoria' => 'electrónica'],
    ['nombre' => 'Silla', 'precio' => 199.99, 'stock' => 15, 'categoria' => 'muebles'],
    ['nombre' => 'Mesa', 'precio' => 149.99, 'stock' => 20, 'categoria' => 'muebles'],
];

function filtrar_por_precio($productos, $min, $max) {
    // TODO: Usar array_filter
}

function ordenar_por_precio(&$productos) {
    // TODO: Usar usort (modifica el array original)
}

function calcular_total_stock($productos) {
    // TODO: Usar array_reduce
}

function nombres_productos($productos) {
    // TODO: Usar array_map para obtener solo nombres
}

function agrupar_por_categoria($productos) {
    // TODO: Agrupar productos por categoría
}

// Pruebas:
// print_r(filtrar_por_precio($productos, 50, 200));
// ordenar_por_precio($productos);
// echo "Total stock: " . calcular_total_stock($productos);
`,
    },
    "Clases y POO": {
      exercise: `## Clases y POO en PHP

**Objetivo:** Crea un sistema de gestión de usuarios con POO.

### Requisitos:
1. Clase \`Usuario\` con atributos protegidos
2. Clase \`Admin\` que hereda de Usuario
3. Encapsulamiento con getters/setters
4. Método estático para contar usuarios
5. Interface \`Autenticable\` con método \`login()\``,
      starterCode: `<?php

interface Autenticable {
    public function login(string $password): bool;
}

class Usuario implements Autenticable {
    protected string $nombre;
    protected string $email;
    protected string $passwordHash;
    protected static int $totalUsuarios = 0;
    
    public function __construct(string $nombre, string $email, string $password) {
        // TODO: Inicializar atributos y hashear password
    }
    
    // TODO: Implementar getters y setters
    
    public function login(string $password): bool {
        // TODO: Verificar password
    }
    
    public static function getTotalUsuarios(): int {
        // TODO: Retornar contador
    }
}

class Admin extends Usuario {
    private array $permisos;
    
    public function __construct(string $nombre, string $email, string $password, array $permisos = []) {
        // TODO: Llamar al padre y agregar permisos
    }
    
    public function tienePermiso(string $permiso): bool {
        // TODO: Verificar si tiene el permiso
    }
}

// Pruebas:
// $user = new Usuario("Fernando", "fernando@email.com", "secret123");
// echo $user->login("secret123") ? "OK" : "Fail";
`,
    },
    "API REST con PHP": {
      exercise: `## API REST con PHP

**Objetivo:** Construye una API REST básica sin framework.

### Requisitos:
1. Manejar métodos GET, POST, PUT, DELETE
2. Endpoint \`/api/productos\`
3. Leer y escribir en archivo JSON (simulación de DB)
4. Respuestas en formato JSON con códigos HTTP correctos
5. Manejo de errores`,
      starterCode: `<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

const DATA_FILE = 'productos.json';

// Inicializar archivo si no existe
function initDB() {
    if (!file_exists(DATA_FILE)) {
        file_put_contents(DATA_FILE, json_encode([]));
    }
}

// Leer todos los productos
function getProductos(): array {
    // TODO: Leer del archivo JSON
}

// Obtener un producto por ID
function getProductoById(int $id): ?array {
    // TODO: Buscar en el array
}

// Crear producto
function createProducto(array $data): array {
    // TODO: Agregar al array y guardar
}

// Actualizar producto
function updateProducto(int $id, array $data): ?array {
    // TODO: Modificar y guardar
}

// Eliminar producto
function deleteProducto(int $id): bool {
    // TODO: Eliminar del array y guardar
}

// Router
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// TODO: Implementar el router basado en $method y $path
// GET /api/productos - listar todos
// GET /api/productos/{id} - obtener uno
// POST /api/productos - crear
// PUT /api/productos/{id} - actualizar
// DELETE /api/productos/{id} - eliminar

switch ($method) {
    case 'GET':
        // TODO
        break;
    case 'POST':
        // TODO
        break;
    case 'PUT':
        // TODO
        break;
    case 'DELETE':
        // TODO
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}
`,
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, language, topic, difficulty, message, code } = body;

    if (action === "generate") {
      // Buscar ejercicio predefinido o generar uno genérico
      const langExercises = exercises[language];
      let exerciseData = langExercises?.[topic];

      if (!exerciseData) {
        // Ejercicio genérico para temas personalizados
        exerciseData = generateGenericExercise(language, topic, difficulty);
      }

      return NextResponse.json({
        success: true,
        exercise: exerciseData.exercise,
        starterCode: exerciseData.starterCode,
      });
    }

    if (action === "hint") {
      const hint = generateHint(language, code);
      return NextResponse.json({
        success: true,
        hint,
      });
    }

    if (action === "validate") {
      const result = validateCode(language, code);
      return NextResponse.json(result);
    }

    if (action === "chat") {
      const result = generateChatResponse(language, message, code);
      return NextResponse.json({
        success: true,
        response: result.response,
        code: result.code || null,
      });
    }

    return NextResponse.json({ success: false, error: "Acción no válida" }, { status: 400 });
  } catch (error) {
    console.error("Error in practicas API:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

function generateGenericExercise(language: string, topic: string, difficulty: string) {
  const templates: Record<string, { exercise: string; starterCode: string }> = {
    java: {
      exercise: `## ${topic} en Java

**Nivel:** ${difficulty}

**Objetivo:** Implementa una solución para el tema: ${topic}

### Instrucciones:
1. Lee el problema cuidadosamente
2. Diseña tu solución pensando en POO
3. Implementa los métodos necesarios
4. Considera casos borde y manejo de errores`,
      starterCode: `public class Solucion {
    // TODO: Implementa tu solución aquí
    
    public static void main(String[] args) {
        // Prueba tu código
    }
}`,
    },
    python: {
      exercise: `## ${topic} en Python

**Nivel:** ${difficulty}

**Objetivo:** Implementa una solución para el tema: ${topic}

### Instrucciones:
1. Lee el problema cuidadosamente
2. Usa el estilo Pythonic
3. Incluye docstrings
4. Considera edge cases`,
      starterCode: `def solucion():
    """
    TODO: Implementa tu solución
    """
    pass

if __name__ == "__main__":
    # Prueba tu código
    pass`,
    },
    php: {
      exercise: `## ${topic} en PHP

**Nivel:** ${difficulty}

**Objetivo:** Implementa una solución para el tema: ${topic}

### Instrucciones:
1. Lee el problema cuidadosamente
2. Sigue las convenciones de PSR-12
3. Maneja errores apropiadamente
4. Documenta tu código`,
      starterCode: `<?php

/**
 * TODO: Implementa tu solución
 */
function solucion() {
    // Tu código aquí
}

// Prueba tu código
`,
    },
  };

  return templates[language] || templates.java;
}

function generateHint(language: string, code: string): string {
  if (!code || code.trim().length < 50) {
    return "Primero escribe algo de código. Revisa la estructura básica del ejercicio y comienza por los elementos más simples.";
  }

  const hints = [
    "Revisa si has declarado todos los tipos de datos correctamente.",
    "Asegúrate de que los métodos tengan los modificadores de acceso apropiados.",
    "Verifica que estés manejando los casos null o vacíos.",
    "¿Has considerado los casos borde en tu lógica?",
    "Los nombres de variables deben ser descriptivos y seguir las convenciones del lenguaje.",
    "Recuerda que la indentación correcta mejora la legibilidad.",
  ];

  return hints[Math.floor(Math.random() * hints.length)];
}

function validateCode(language: string, code: string) {
  if (!code || code.trim().length < 30) {
    return {
      success: false,
      feedback: "El código está muy incompleto. Escribe más líneas para poder evaluar.",
    };
  }

  // Análisis básico del código
  const hasTODO = code.toLowerCase().includes("todo");
  const hasComments = code.includes("//") || code.includes("/*") || code.includes("#");
  const lineCount = code.split("\n").filter((l) => l.trim()).length;

  let feedback = "";
  let score = 0;

  if (!hasTODO) score += 30;
  if (hasComments) score += 20;
  if (lineCount > 20) score += 20;
  if (lineCount > 40) score += 15;

  // Verificaciones específicas por lenguaje
  if (language === "java") {
    if (code.includes("public") || code.includes("private")) score += 10;
    if (code.includes("class ")) score += 5;
  } else if (language === "python") {
    if (code.includes("def ")) score += 10;
    if (code.includes("return ")) score += 5;
  } else if (language === "php") {
    if (code.includes("function ")) score += 10;
    if (code.includes("public") || code.includes("private")) score += 5;
  }

  if (hasTODO) {
    feedback = "💡 Todavía hay tareas pendientes (TODO). Completa la implementación.";
  } else if (score < 50) {
    feedback = "⚠️ El código es muy básico. Agrega más funcionalidad y manejo de casos.";
  } else if (score < 80) {
    feedback = "✅ Buen progreso. Considera agregar más validaciones y comentarios.";
  } else {
    feedback = "🎉 Excelente trabajo. El código está bien estructurado y completo.";
  }

  return {
    success: score >= 50 && !hasTODO,
    feedback: `${feedback}\n\n📊 Puntuación: ${Math.min(score, 100)}/100`,
    correctedCode: null,
  };
}

function generateChatResponse(language: string, message: string, code: string): { response: string; code?: string } {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("error") || lowerMessage.includes("error")) {
    return {
      response: "Para ayudarte con errores, pega el mensaje de error completo y te indicaré cómo solucionarlo.",
    };
  }

  if (lowerMessage.includes("ayuda") || lowerMessage.includes("help")) {
    return {
      response: `Claro, estoy aquí para ayudarte. Puedo:

1. **Explicar conceptos** - Dime qué tema no entiendes
2. **Revisar tu código** - Puedo analizar tu implementación
3. **Dar pistas** - Te guío sin darte la respuesta completa
4. **Corregir errores** - Pega el error y te ayudo

¿Qué necesitas específicamente?`,
    };
  }

  if (lowerMessage.includes("ejemplo") || lowerMessage.includes("example")) {
    const examples: Record<string, string> = {
      java: `Aquí tienes un ejemplo simple en Java:

\`\`\`java
public class Persona {
    private String nombre;
    
    public Persona(String nombre) {
        this.nombre = nombre;
    }
    
    public String getNombre() {
        return nombre;
    }
}
\`\`\``,
      python: `Aquí tienes un ejemplo simple en Python:

\`\`\`python
class Persona:
    def __init__(self, nombre):
        self.nombre = nombre
    
    def get_nombre(self):
        return self.nombre
\`\`\``,
      php: `Aquí tienes un ejemplo simple en PHP:

\`\`\`php
class Persona {
    private $nombre;
    
    public function __construct($nombre) {
        $this->nombre = $nombre;
    }
    
    public function getNombre() {
        return $this->nombre;
    }
}
\`\`\``,
    };

    return { response: examples[language] || examples.java };
  }

  return {
    response: `Entiendo tu pregunta sobre "${message}". 

Para ayudarte mejor, puedes:
- Ser más específico sobre qué parte del código te confunde
- Pegar el código que te da problemas
- Preguntar sobre conceptos específicos del lenguaje`,
  };
}
