import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { TrendingUp, Users, FileText, FolderOpen, Activity, Database, Globe, Calendar } from "lucide-react"

const DashboardPage = () => {
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Ringkasan lengkap aktivitas dan performa aplikasi kamu
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-sm font-medium">Total Category</CardDescription>
            <FolderOpen className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-3xl font-bold">12</CardTitle>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2 baru bulan ini
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-sm font-medium">Total Posts</CardDescription>
            <FileText className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-3xl font-bold">48</CardTitle>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3 hari ini
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-sm font-medium">User Aktif</CardDescription>
            <Users className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-3xl font-bold">128</CardTitle>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">●</span> 24 online sekarang
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-sm font-medium">Konversi</CardDescription>
            <Activity className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-3xl font-bold">3.4%</CardTitle>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.8% dari minggu lalu
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription>
              Timeline aktivitas terbaru di sistem kamu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                action: "Post baru ditambahkan", 
                detail: "“Belajar Supabase dengan Next.js”", 
                time: "2 menit lalu",
                type: "post",
                color: "bg-green-500"
              },
              { 
                action: "Category diperbarui", 
                detail: "Category “Coding” di-update", 
                time: "15 menit lalu",
                type: "category",
                color: "bg-blue-500"
              },
              { 
                action: "User baru registrasi", 
                detail: "roisdev@example.com", 
                time: "1 jam lalu",
                type: "user",
                color: "bg-purple-500"
              },
              { 
                action: "Backup database", 
                detail: "Backup otomatis harian", 
                time: "2 jam lalu",
                type: "system",
                color: "bg-orange-500"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Database className="h-5 w-5 mr-2 text-green-600" />
                Info Sistem
              </CardTitle>
              <CardDescription>
                Status environment dan deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: Globe, label: "Environment", value: "Development", color: "text-blue-600" },
                { icon: FileText, label: "Versi App", value: "v1.0.0", color: "text-green-600" },
                { icon: Database, label: "Database", value: "Supabase", color: "text-purple-600" },
                { icon: Calendar, label: "Last Deploy", value: "23 Nov 2025", color: "text-orange-600" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2">
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Statistik Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <span className="text-sm">Postingan Bulan Ini</span>
                <span className="font-bold text-blue-600">12</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
                <span className="text-sm">User Baru</span>
                <span className="font-bold text-green-600">8</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                <span className="text-sm">Komentar</span>
                <span className="font-bold text-purple-600">24</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage