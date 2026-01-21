"use client";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePrestadores, type Prestador } from "@/hooks/usePrestadores";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit, Trash2, Users, Mail, Phone, UserPlus } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

const formSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  position: z.string().min(1, "Cargo requerido"),
  organization: z.string().min(1, "Organización requerida"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  password: z.string().min(6, "Mínimo 6 caracteres").optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AdminPrestadores() {
  const { prestadores, loading, createPrestador, createPrestadorConUsuario, updatePrestador, deletePrestador } = usePrestadores();
  const [editMode, setEditMode] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const [selectedPrestador, setSelectedPrestador] = useState<Prestador | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      position: "",
      organization: "",
      email: "",
      phone: "",
      status: "active" as const,
      password: "Temp123!",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (editMode && selectedPrestador) {
        const result = await updatePrestador(selectedPrestador.id, data);
        if (result) {
          toast({ title: "✅ Prestador actualizado" });
          setEditMode(false);
          setSelectedPrestador(null);
          form.reset();
        }
      } else if (createUser) {
        // Crear USUARIO + PRESTADOR
        const result = await createPrestadorConUsuario({ 
          ...data, 
          password: data.password || "Temp123!" 
        });
        if (result) {
          toast({
            title: "✅ Usuario + Prestador creados",
            description: `Email: ${data.email} | Password: ${data.password || "Temp123!"}`
          });
          form.reset();
          setCreateUser(false);
        }
      } else {
        // Crear SOLO prestador
        const result = await createPrestador(data);
        if (result) {
          toast({ title: "✅ Prestador creado (sin usuario)" });
          form.reset();
        }
      }
      
      setEditMode(false);
      setSelectedPrestador(null);
    } catch (error: any) {
      toast({
        title: "❌ Error",
        description: error.message || "No se pudo crear el prestador",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (prestador: Prestador) => {
    form.reset(prestador);
    setSelectedPrestador(prestador);
    setEditMode(true);
    setCreateUser(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Eliminar este prestador permanentemente?")) {
      await deletePrestador(id);
      toast({ title: "✅ Prestador eliminado" });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Prestadores</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Gestiona los prestadores del sistema ({prestadores.length})
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="sidebar-gradient hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                {editMode ? "Editar prestador" : "Crear nuevo"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editMode ? "Editar prestador" : "Crear nuevo prestador"}
                </DialogTitle>
                <DialogDescription>
                  {editMode
                    ? "Actualiza la información del prestador seleccionado"
                    : "Ingresa los datos del nuevo prestador"}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Datos básicos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo *</FormLabel>
                          <FormControl>
                            <Input placeholder="Juan Pérez" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cargo / Posición *</FormLabel>
                          <FormControl>
                            <Input placeholder="Jefe de Mantenimiento" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organización / IPS *</FormLabel>
                          <FormControl>
                            <Input placeholder="UniSalud EPS" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input placeholder="juan@unisalud.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="300 123 4567" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Crear usuario */}
                  {!editMode && (
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3 mb-3">
                        <UserPlus className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-foreground">Crear cuenta de usuario</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="createUser" 
                          checked={createUser}
                          onCheckedChange={setCreateUser}
                        />
                        <label 
                          htmlFor="createUser" 
                          className="text-sm leading-none cursor-pointer"
                        >
                          Crear usuario en Supabase Auth (puede iniciar sesión inmediatamente)
                        </label>
                      </div>
                    </div>
                  )}

                  {createUser && !editMode && (
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña inicial *</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Temp123!" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground mt-1">
                            El prestador podrá loguear con: <strong>{form.watch("email")}</strong> / esta contraseña
                          </p>
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Activo</SelectItem>
                            <SelectItem value="inactive">Inactivo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditMode(false);
                        setSelectedPrestador(null);
                        setCreateUser(false);
                        form.reset();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="sidebar-gradient hover:opacity-90">
                      {editMode 
                        ? "Actualizar prestador" 
                        : createUser 
                          ? "Crear usuario + prestador" 
                          : "Crear prestador"
                      }
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabla */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Lista de prestadores</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-lg text-muted-foreground animate-pulse">Cargando prestadores...</div>
              </div>
            ) : prestadores.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground space-y-2">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No hay prestadores registrados</p>
                <p className="text-sm">¡Crea el primero usando el botón arriba!</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Organización</TableHead>
                      <TableHead className="w-36">Email</TableHead>
                      <TableHead className="w-32">Teléfono</TableHead>
                      <TableHead className="w-24">Estado</TableHead>
                      <TableHead className="w-32 text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prestadores.map((prestador) => (
                      <TableRow key={prestador.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{prestador.name}</TableCell>
                        <TableCell className="text-sm">{prestador.position}</TableCell>
                        <TableCell className="text-sm font-medium">{prestador.organization}</TableCell>
                        <TableCell className="font-mono text-sm break-all">{prestador.email}</TableCell>
                        <TableCell className="text-sm">{prestador.phone || "-"}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={prestador.status === "active" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {prestador.status === "active" ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(prestador)}
                              className="h-8 w-8 p-0 hover:bg-muted"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(prestador.id)}
                              className="h-8 w-8 p-0 hover:bg-destructive/10 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
