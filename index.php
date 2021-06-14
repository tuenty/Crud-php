<?php
include 'includes/funciones/funciones.php';
include 'includes/layout/header.php'; ?>

<div class="contenedor-barra">
    <h1>Agenda de Contactos</h1>
</div>

<div class="bg-amarillo contenedor sombra">
    <form id='contacto' action="#">
        <legend>Añada un contacto</legend>
        <span>Todos los campos son obligatorios</span>

        <div class="campos">
            <div class="campo">
                <label for="nombre">Nombre:</label>
                <input type="text" placeholder="Nombre Contacto" id="nombre">
            </div>
            <div class="campo">
                <label for="empresa">Empresa:</label>
                <input type="text" placeholder="Nombre Empresa" id="empresa">
            </div>
            <div class="campo">
                <label for="telefono">telefono:</label>
                <input type="tel" placeholder="Telefono Contacto" id="telefono">
            </div>
        </div>
        <div class="campo enviar">
            <input type="hidden" id="accion" value="crear">
            <input type="submit" value="Añadir">
        </div>



    </form>
</div>

<div class="bg-gris contenedor sombra contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>
        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar Contactos...">

        <p class="total-contactos"> <span></span> Contactos</p>

        <div class="contenedor-tabla">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>

                    <?php $contactos = obtenerContactos();


                    if ($contactos->num_rows) {

                        foreach ($contactos as $contacto) { ?>
                            <tr>
                                <td><?php echo $contacto['nombre']; ?></td>
                                <td><?php echo $contacto['empresa']; ?></td>
                                <td><?php echo $contacto['telefono']; ?></td>
                                <td>
                                    <a class="btn-editar btn" href="editar.php?id=<?php echo $contacto['id']; ?>">
                                        <i class="fas fa-pen-square"></i>
                                    </a>
                                    <button data-id="<?php echo $contacto['id']; ?>" type="button" class="btn-borrar btn">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                    <?php }
                    }  ?>
                </tbody>
            </table>

        </div>
    </div>
</div>



<?php include 'includes/layout/footer.php'; ?>