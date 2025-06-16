
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, MapPin, Clock, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    bloodType: '',
    quantity: '',
    location: '',
    urgency: 'Medium',
    dateNeeded: ''
  });

  // Mock data - in real app, this would come from API
  const [requests, setRequests] = useState([
    {
      id: '1',
      bloodType: 'O+',
      quantity: '2 pints',
      location: 'New York Presbyterian Hospital',
      urgency: 'High',
      dateNeeded: '2024-01-20',
      status: 'pending',
      donorName: null
    },
    {
      id: '2',
      bloodType: 'O+',
      quantity: '1 pint',
      location: 'Mount Sinai Hospital',
      urgency: 'Medium',
      dateNeeded: '2024-01-25',
      status: 'accepted',
      donorName: 'John Smith'
    }
  ]);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    const request = {
      id: Date.now().toString(),
      ...newRequest,
      status: 'pending',
      donorName: null
    };
    
    setRequests([...requests, request]);
    setIsDialogOpen(false);
    setNewRequest({
      bloodType: '',
      quantity: '',
      location: '',
      urgency: 'Medium',
      dateNeeded: ''
    });
    
    toast({
      title: "Request submitted",
      description: "Your blood donation request has been submitted successfully."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}! Manage your blood donation requests.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Blood Donation Request</DialogTitle>
                <DialogDescription>
                  Fill out the details for your blood donation request.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label>Blood Type Needed</Label>
                  <Select value={newRequest.bloodType} onValueChange={(value) => setNewRequest({...newRequest, bloodType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
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

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Needed</Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 2 pints"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest({...newRequest, quantity: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Hospital/Location</Label>
                  <Input
                    id="location"
                    placeholder="Hospital name and address"
                    value={newRequest.location}
                    onChange={(e) => setNewRequest({...newRequest, location: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <Select value={newRequest.urgency} onValueChange={(value) => setNewRequest({...newRequest, urgency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateNeeded">Date Needed</Label>
                  <Input
                    id="dateNeeded"
                    type="date"
                    value={newRequest.dateNeeded}
                    onChange={(e) => setNewRequest({...newRequest, dateNeeded: e.target.value})}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Submit Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Current Requests */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Requests</h2>
          
          {requests.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No blood donation requests yet.</p>
                <p className="text-sm text-gray-500">Click "New Request" to submit your first request.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {requests.map((request) => (
                <Card key={request.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Request #{request.id}</CardTitle>
                        <CardDescription>
                          {request.status === 'accepted' && request.donorName 
                            ? `Accepted by ${request.donorName}`
                            : 'Waiting for donor'
                          }
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency} Priority
                        </Badge>
                      </div>
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
                    
                    {request.status === 'pending' && (
                      <div className="mt-6">
                        <Button variant="outline" className="w-full">
                          Cancel Request
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {requests.filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Fulfilled</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {requests.filter(r => r.status === 'accepted').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
