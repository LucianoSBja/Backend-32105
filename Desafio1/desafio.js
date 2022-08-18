class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`)
    }
    
    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
    }
    
    countMascotas(){
        console.log(`${this.mascotas.length}`)
    }
    
    getBooksName(libros){
        this.libros.map((libro)=> {
            console.log(`${libro.nombreLibro} `);
        })
    }

    addBook(nombreLibro, autorLibro){
        this.libros.push({nombreLibro, autorLibro})
    }
}

const persona = new Usuario('Stan', 'Lee')

persona.getFullName();
persona.addMascota('Gamora el gato');
persona.addMascota('Capitan el perro')
persona.countMascotas();
persona.addBook('Excelsior!: The Amazing Life of Stan Lee.', 'Lee Stan'  );
persona.addBook( 'Origins of Marvel Comics. Marvel Entertainment Group.', 'Lee Stan')
persona.getBooksName();

