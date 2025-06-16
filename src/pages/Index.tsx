
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, MapPin, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Heart className="h-16 w-16 text-white mx-auto mb-8" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Save Lives with BloodConnect
            </h1>
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
              Connect blood donors with patients in need. Our platform makes it easy to find, request, 
              and donate blood in your local community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-3">
                  Join as Donor
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3">
                  Request Blood
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How BloodConnect Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects the right people at the right time to save lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Register & Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Sign up as a donor or patient. Create your profile with blood type and location information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Find Local Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Patients post requests, donors find nearby matches. Google Maps integration shows exact locations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Save Lives</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect directly, coordinate donations, and help save lives in your community.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Making a Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">1,247</div>
              <div className="text-gray-600">Lives Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">3,891</div>
              <div className="text-gray-600">Registered Donors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">156</div>
              <div className="text-gray-600">Active Requests</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 text-white mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Save Lives?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of donors and patients who trust BloodConnect for their blood donation needs.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-3">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <Heart className="h-8 w-8 text-red-600 mr-2" />
            <span className="text-2xl font-bold">BloodConnect</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 BloodConnect. All rights reserved.</p>
            <p className="mt-2">Connecting donors and patients to save lives.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
