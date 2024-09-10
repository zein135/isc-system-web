import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Chip, Divider, Grid, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { FormContainer } from "../CreateGraduation/components/FormContainer";
import { getRoles } from "../../services/roleService";
import SuccessDialog from "../../components/common/SucessDialog";
import ErrorDialog from "../../components/common/ErrorDialog";
import { getUserById, putUser, createUserWIthRoles } from "../../services/usersService";
import { Role } from "../../models/roleInterface";

const CreateUserPage = () => {

  const navigate = useNavigate()
  const [isSuccesOpen, setIsSuccessOpen] = useState<boolean>(false)
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false)
  const [roles, setRoles] = useState<Role[]>([])
  const [isTeacher, setIsTeacher] = useState<boolean>(true)
  const {id} = useParams()

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre completo es obligatorio"),
    lastname: Yup.string().required("El apellido es obligatorio"),
    mothername: Yup.string().required("El apellido materno es obligatorio"),
    email: Yup.string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es obligatorio"),
    cellphone: Yup.string()
      .matches(/^[0-9]{8}$/, "Ingrese un número de teléfono válido")
      .optional(),
    code: Yup.number().optional(),
    roles: Yup.array().min(1).required("El usuario debe tener un rol"),
    degree: Yup.string().when({
      is: () => isTeacher,
      then: () => Yup.string().required("El título académico es obligatorio"),
      otherwise: () => Yup.string().notRequired()
    })
  })

  const form = useFormik(
    {
      initialValues: {
        name: "",
        code: "",
        lastname: "",
        mothername: "",
        email: "",
        cellphone: "",
        roles: [],
        degree: ""
      },
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          if(id)
            await putUser(id, values)
          else
            await createUserWIthRoles(values)
          setIsSuccessOpen(true)  
          resetForm();
        } catch (error) {
          setIsErrorOpen(true)
        }
      },
    }
  )

  const handleChangeIsTeacher = ({target}) => {
    setIsTeacher(target.value)
  }

  const fetchRoles = async () => {
    const rolesResponse = await getRoles()
    setRoles(rolesResponse)
  }

  const fetchUser = async () => {
    if(!id) return
    const {name, code, lastname, mothername, email, cellphone, roles, degree, isTeacher} = await getUserById(parseInt(id))
    form.setFieldValue('name', name)
    form.setFieldValue('code', code)
    form.setFieldValue('lastname', lastname)
    form.setFieldValue('mothername', mothername)
    form.setFieldValue('email', email)
    form.setFieldValue('cellphone', cellphone)
    form.setFieldValue('roles', roles)
    form.setFieldValue('degree', degree)
    setIsTeacher(isTeacher)
  }

  useEffect(() => {
      fetchRoles()
      fetchUser()
  }, [])

  return (
    <FormContainer>
      <form 
      onSubmit={form.handleSubmit}
      >
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item>
            <Typography variant="h4">
              {
                (id)? "Editar Usuario":
                "Crear Nuevo Usuario"
              }
              </Typography>
            <Typography variant="body2" sx={{ fontSize: 14, color: "gray" }}>
              Ingrese los datos del {id && "nuevo"} usuario a continuación.
            </Typography>
            <Divider flexItem sx={{ mt: 2, mb: 2 }} />
          </Grid>
          {!id && <Grid container  sx={{padding: 2}} spacing={2}>
            <Grid item>              
              <Typography variant="h6">Tipo de Usuario</Typography>
            </Grid>
            <Grid item>
              <Select
                value={isTeacher}
                label={"Estudiante o Docente"}
                onChange={handleChangeIsTeacher}
              >
                <MenuItem value={true}>Docente</MenuItem>
                <MenuItem value={false}>Estudiante</MenuItem>
              </Select>
            </Grid>
          </Grid>}
          

          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item>
                <Typography variant="h6">Información del Usuario</Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="name"
                      name="name"
                      label="Nombres"
                      fullWidth
                      value={form.values.name}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.touched.name && Boolean(form.errors.name)}
                      helperText={form.touched.name && form.errors.name}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="lastname"
                      name="lastname"
                      label="Apellido Paterno"
                      variant="outlined"
                      fullWidth
                      value={form.values.lastname}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.touched.lastname && Boolean(form.errors.lastname)}
                      helperText={form.touched.lastname && form.errors.lastname}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                  <TextField
                      id="mothername"
                      name="mothername"
                      label="Apellido Materno"
                      variant="outlined"
                      fullWidth
                      value={form.values.mothername}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.touched.mothername && Boolean(form.errors.mothername)}
                      helperText={form.touched.mothername && form.errors.mothername}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="code"
                      name="code"
                      label="Codigo del Usuario"
                      variant="outlined"
                      fullWidth
                      value={form.values.code}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.touched.code && Boolean(form.errors.code)}
                      helperText={form.touched.code && form.errors.code}
                      margin="normal"
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                </Grid>
                {isTeacher && <TextField
                  id="degree"
                  name="degree"
                  label="Título Académico"
                  variant="outlined"
                  fullWidth
                  select
                  value={form.values.degree}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.touched.degree && Boolean(form.errors.degree)}
                  helperText={form.touched.degree && form.errors.degree}
                  margin="normal"
                >
                  <MenuItem value="">Seleccione un título</MenuItem>
                  <MenuItem value="Ing.">Ing.</MenuItem>
                  <MenuItem value="Msc">Msc.</MenuItem>
                  <MenuItem value="PhD">PhD.</MenuItem>
                </TextField>}
              </Grid>
            </Grid>
            <Divider flexItem sx={{ my: 2 }} />
          </Grid>

          

          <Grid item md={12}>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Información Adicional</Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  id="email"
                  name="email"
                  label="Correo Electrónico"
                  variant="outlined"
                  fullWidth
                  value={form.values.email}
                  onChange={form.handleChange}
                  error={form.touched.email && Boolean(form.errors.email)}
                  helperText={form.touched.email && form.errors.email}
                  margin="normal"
                  inputProps={{ maxLength: 50 }}
                />
                <TextField
                  id="cellphone"
                  name="cellphone"
                  label="Número de Teléfono"
                  variant="outlined"
                  fullWidth
                  value={form.values.cellphone}
                  onChange={form.handleChange}
                  error={form.touched.cellphone && Boolean(form.errors.cellphone)}
                  helperText={form.touched.cellphone && form.errors.cellphone}
                  margin="normal"
                  inputProps={{ maxLength: 8 }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{padding: 2}}>
              <Grid item xs={12} md={4}>            
                <Typography variant="h6">Rol</Typography>
              </Grid>
              <Grid item xs={12} md={8}>

                <Select multiple
                  fullWidth
                  name="roles"
                  label="Roles"
                  value={form.values.roles}
                  onChange={(event)=>{
                      form.setFieldValue('roles', event.target.value)
                  }}
                  onBlur={form.handleBlur}
                  input={<OutlinedInput label="Roles"/>}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  >
                  {roles.map((rol:Role) => (
                    <MenuItem
                      key={rol.roleName}
                      value={rol.roleName}
                    >{rol.roleName}</MenuItem> 
                  ))}
                </Select>
              </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                GUARDAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <SuccessDialog
        open={isSuccesOpen}
        onClose={() => {
          setIsSuccessOpen(false)
          navigate('/users')
        }}
        title={(id)?"¡Estudiante Actualizado!":"¡Estudiante Creado!"}
        subtitle={`El estudiante ha sido ${(id)?"actualizado": "creado"} con éxito.`}
      />
      <ErrorDialog
        open={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        title={"¡Vaya!"}
        subtitle={"Hubo un problema al crear el nuevo usuario. Intentelo de nuevo mas tarde"}
      />
    </FormContainer>
  );
}

export default CreateUserPage