
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, MapPin, Clock, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [searchFilters, setSearchFilters] = useState({
    bloodType: '',
    location: ''
  });

  // Mock data - in real app, this would come from API
  const [requests] = useState([
    {
      id: '1',
      patientName: 'Sarah Johnson',
      bloodType: 'O+',
      quantity: '2 pints',
      location: 'New York Presbyterian Hospital',
      urgency: 'High',
      dateNeeded: '2024-01-20',
      status: 'pending'
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      bloodType: 'A-',
      quantity: '1 pint',
      location: 'Mount Sinai Hospital',
      urgency: 'Medium',
      dateNeeded: '2024-01-22',
      status: 'pending'
    },
    {
      id: '3',
      patientName: 'Emily Rodriguez',
      bloodType: 'B+',
      quantity: '3 pints',
      location: 'NYU Langone Health',
      urgency: 'High',
      dateNeeded: '2024-01-21',
      status: 'pending'
    }
  ]);

  const handleAcceptRequest = (requestId: string) => {
    toast({
      title: "Request accepted",
      description: "You have successfully accepted this donation request. The patient will be notified."
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Find blood donation requests in your area.</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Blood Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Select value={searchFilters.bloodType} onValueChange={(value) => setSearchFilters({...searchFilters, bloodType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Blood Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input 
                  placeholder="Location" 
                  value={searchFilters.location}
                  onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                />
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                Search Requests
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blood Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {requests.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Blood Needed</CardTitle>
                    <CardDescription>Patient: {request.patientName}</CardDescription>
                  </div>
                  <Badge className={getUrgencyColor(request.urgency)}>
                    {request.urgency} Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-red-600 mr-2" />
                    <span className="font-semibold text-xl text-red-600">{request.bloodType}</span>
                    <span className="ml-2 text-gray-600">({request.quantity})</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{request.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Needed by: {new Date(request.dateNeeded).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Button 
                    onClick={() => handleAcceptRequest(request.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    Accept Request
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Donations</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Lives Saved</p>
                  <p className="text-2xl font-bold text-gray-900">36</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
