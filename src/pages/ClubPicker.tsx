import { signOut } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, LogOut } from 'lucide-react';

export default function ClubPicker() {
  const { clubs, setActiveClub, profile } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome, {profile?.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">Select a club to continue</p>
      </div>
      <div className="w-full max-w-sm space-y-3">
        {clubs.map((club) => (
          <button
            key={club.id}
            onClick={() => setActiveClub(club)}
            className="w-full text-left"
          >
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">{club.name}</p>
                  <p className="text-xs text-muted-foreground">{club.region} · Path {club.deploymentPath}</p>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
      <Button variant="ghost" size="sm" onClick={signOut} className="gap-2 text-muted-foreground">
        <LogOut className="h-4 w-4" />
        Sign out
      </Button>
    </div>
  );
}
