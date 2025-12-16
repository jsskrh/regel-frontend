"use client";

import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import PageHeader from "@/components/common/PageHeader";
import { useGetOnboardingDetailsQuery } from "@/lib/features/account/accountApi";

const OnboardingPage = () => {
    const { data: onboardingDetails, isLoading } = useGetOnboardingDetailsQuery();

    const checklistItems = [
        { 
            name: "Company Profile", 
            completed: !!(onboardingDetails?.company && onboardingDetails?.website) 
        },
        { 
            name: "Business Details", 
            completed: !!onboardingDetails?.estimatedMonthlySms 
        },
        { 
            name: "Sample Messages", 
            completed: !!(onboardingDetails?.samplePromotionalMessage && onboardingDetails?.sampleTransactionalMessage) 
        },
        { 
            name: "CAC Document", 
            completed: !!onboardingDetails?.cacDocumentUrl 
        },
    ];

    const completedSteps = checklistItems.filter(item => item.completed).length;
    const totalSteps = checklistItems.length;

    if (isLoading) {
        return <p>Loading onboarding status...</p>;
    }

    return (
        <div>
            <PageHeader title="Onboarding" description="Complete your account setup" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold">Compliance</h3>
                    <p className="text-sm text-gray-500 mb-4">{completedSteps} of {totalSteps} complete</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(completedSteps / totalSteps) * 100}%` }}></div>
                    </div>
                    <ul className="space-y-4">
                        {checklistItems.map(item => (
                            <li key={item.name} className="flex items-center">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${item.completed ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                                    {item.completed ? '✓' : ''}
                                </span>
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-2">
                    <OnboardingForm />
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;