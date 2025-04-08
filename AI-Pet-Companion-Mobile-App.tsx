// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef, useCallback } from 'react';
const App: React.FC = () => {
const [activeTab, setActiveTab] = useState('home');
const [shopCategories, setShopCategories] = useState([
{ id: 1, name: 'Medicines', icon: 'fas fa-pills', image: 'https://public.readdy.ai/ai/img_res/7e116ffeea4ddd7b61ede88fe06bddb1.jpg' },
{ id: 2, name: 'Food', icon: 'fas fa-bone', image: 'https://public.readdy.ai/ai/img_res/044166c59d148d7d4c734085c4c87ccd.jpg' },
{ id: 3, name: 'Accessories', icon: 'fas fa-tag', image: 'https://public.readdy.ai/ai/img_res/12c99d30f524b114efb2e9d6cd916371.jpg' },
{ id: 4, name: 'Supplements', icon: 'fas fa-capsules', image: 'https://public.readdy.ai/ai/img_res/d11e2d6caa9f302c83697b4ff8549780.jpg' },
{ id: 5, name: 'Toys', icon: 'fas fa-baseball-ball', image: 'https://public.readdy.ai/ai/img_res/628210d2a76882f6bdaee061490c0634.jpg' },
{ id: 6, name: 'Grooming', icon: 'fas fa-cut', image: 'https://public.readdy.ai/ai/img_res/c4965365d164565d30baf738d70f0abc.jpg' }
]);
const [shopProducts, setShopProducts] = useState([
{ id: 1, name: 'PetAmox', category: 'Medicines', subcategory: 'Antibiotics', price: '$24.99', image: 'https://public.readdy.ai/ai/img_res/72a01c8d6a301f5383b969e57c919821.jpg' },
{ id: 2, name: 'PetRelief', category: 'Medicines', subcategory: 'Anti-inflammatory', price: '$19.99', image: 'https://public.readdy.ai/ai/img_res/6b762bc35b71154566a950da225a680b.jpg' },
{ id: 3, name: 'FleaGuard', category: 'Medicines', subcategory: 'Flea & Tick', price: '$32.99', image: 'https://public.readdy.ai/ai/img_res/10b5d9b2ea8ad3935bdf54d6a3f08501.jpg' },
{ id: 4, name: 'Premium Dog Food', category: 'Food', subcategory: 'Dry Food', price: '$45.99', image: 'https://public.readdy.ai/ai/img_res/1d0f6f5b98b9da01d5625e1d1ce4a881.jpg' },
{ id: 5, name: 'PetPal Smart Collar', category: 'Accessories', subcategory: 'Tech', price: '$89.99', image: 'https://public.readdy.ai/ai/img_res/f68eff412b73e3eb9e71e44f43c1e205.jpg' },
{ id: 6, name: 'Dental Chews', category: 'Food', subcategory: 'Treats', price: '$15.99', image: 'https://public.readdy.ai/ai/img_res/dff5c6bc3d7a7be4cda90a224fc4bbb5.jpg' },
{ id: 7, name: 'Joint Supplement', category: 'Supplements', subcategory: 'Joint Health', price: '$29.99', image: 'https://public.readdy.ai/ai/img_res/3d0d14fc0231c9a6a12a17620038d9a5.jpg' },
{ id: 8, name: 'Interactive Puzzle Toy', category: 'Toys', subcategory: 'Mental Stimulation', price: '$22.99', image: 'https://public.readdy.ai/ai/img_res/a655bbad8fe68b917f375b9db86b17d2.jpg' }
]);
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [searchQuery, setSearchQuery] = useState('');
const [isRecording, setIsRecording] = useState(false);
const [recordingTime, setRecordingTime] = useState(0);
const [translationResult, setTranslationResult] = useState<null | {
mood: string;
translation: string;
confidence: number;
}>(null);
const [arMode, setArMode] = useState<'scan' | 'preview' | 'styles'>('scan');
const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
const [petStyles, setPetStyles] = useState([
{ id: 1, name: 'Summer Cut', image: 'https://public.readdy.ai/ai/img_res/642d6640eee70468456066c5d8313b11.jpg' },
{ id: 2, name: 'Teddy Bear', image: 'https://public.readdy.ai/ai/img_res/84808d059f21f5710199ad4a980bc282.jpg' },
{ id: 3, name: 'Show Cut', image: 'https://public.readdy.ai/ai/img_res/5b8d94c039f93cb10577696909ae2af5.jpg' },
{ id: 4, name: 'Sporty', image: 'https://public.readdy.ai/ai/img_res/7bc2f89b8b2608190f863ec4715036e3.jpg' }
]);
const [petAccessories, setPetAccessories] = useState([
{ id: 1, name: 'Bow Tie', image: 'https://public.readdy.ai/ai/img_res/5e866d8717ef80aa5a6ff1189b6c60c7.jpg' },
{ id: 2, name: 'Bandana', image: 'https://public.readdy.ai/ai/img_res/437a2f0a1143e6936b27636175a0429e.jpg' },
{ id: 3, name: 'Harness', image: 'https://public.readdy.ai/ai/img_res/a08f4671dd30989fdb68fb99ff514528.jpg' },
{ id: 4, name: 'Sunglasses', image: 'https://public.readdy.ai/ai/img_res/ba62d46e75022ddcb270e68dfd842b6a.jpg' }
]);
const [streak, setStreak] = useState(5);
const [petName, setPetName] = useState('Buddy');
const [petType, setPetType] = useState('Dog');
const [showPremiumModal, setShowPremiumModal] = useState(false);
const [showSubscriptionConfirmation, setShowSubscriptionConfirmation] = useState(false);
const [selectedPlan, setSelectedPlan] = useState({ name: 'Basic', price: '$4.99', features: ['Unlimited translations', 'Basic health insights', 'Ad-free experience'] });
const [healthCheckStep, setHealthCheckStep] = useState(1);
const [wearableConnected, setWearableConnected] = useState(false);
const [wearableData, setWearableData] = useState({
temperature: '101.2',
heartRate: '85',
steps: '3,245',
sleepHours: '10.5',
lastSync: 'Today, 10:23 AM'
});
const [wearableHistory, setWearableHistory] = useState([
{ date: 'Apr 4', temperature: '101.2', heartRate: '85', steps: '3,245', sleepHours: '10.5' },
{ date: 'Apr 3', temperature: '101.5', heartRate: '92', steps: '4,120', sleepHours: '9.8' },
{ date: 'Apr 2', temperature: '101.3', heartRate: '88', steps: '3,890', sleepHours: '10.2' },
{ date: 'Apr 1', temperature: '101.4', heartRate: '90', steps: '3,560', sleepHours: '9.5' },
{ date: 'Mar 31', temperature: '101.6', heartRate: '95', steps: '2,980', sleepHours: '8.7' },
{ date: 'Mar 30', temperature: '101.3', heartRate: '87', steps: '3,750', sleepHours: '10.3' },
{ date: 'Mar 29', temperature: '101.4', heartRate: '89', steps: '4,210', sleepHours: '9.9' }
]);
const [healthCheckData, setHealthCheckData] = useState({
symptoms: [] as string[],
temperature: '',
heartRate: '',
respirationRate: '',
bodyConditionScore: 3,
concernPhotos: [] as string[],
notes: ''
});
const [showAssistantModal, setShowAssistantModal] = useState(false);
const [assistantMessage, setAssistantMessage] = useState('');
const [assistantChat, setAssistantChat] = useState<{sender: 'user' | 'assistant', message: string}[]>([
{sender: 'assistant', message: 'Hello! I\'m your AI pet assistant powered by ChatGPT. How can I help you today?'}
]);
const [isAssistantLoading, setIsAssistantLoading] = useState(false);
const [tipOfTheDay, setTipOfTheDay] = useState('Regular grooming not only keeps your pet looking good but also promotes bonding and allows you to check for any health issues.');
const [activityLogs, setActivityLogs] = useState([
{type: 'food', time: 'Today, 8:30 AM', description: 'Morning meal logged'},
{type: 'walk', time: 'Yesterday, 5:15 PM', description: '30 min walk completed'},
{type: 'translation', time: 'Yesterday, 2:45 PM', description: 'Translation: "I\'m hungry!"'}
]);
const [showNewActivityModal, setShowNewActivityModal] = useState(false);
const [showMedicineModal, setShowMedicineModal] = useState(false);
const [showAddToCartModal, setShowAddToCartModal] = useState(false);
const [showAddedNotification, setShowAddedNotification] = useState(false);
const [cartItems, setCartItems] = useState<{name: string, price: string, category: string, quantity: number}[]>([]);
const [selectedProduct, setSelectedProduct] = useState<{name: string, price: string, category: string, quantity: number}>({
name: '',
price: '',
category: '',
quantity: 1
});
const [newActivity, setNewActivity] = useState({
type: 'food',
description: '',
duration: '',
amount: ''
});
// Simulated recording timer
useEffect(() => {
let interval: NodeJS.Timeout;
if (isRecording) {
interval = setInterval(() => {
setRecordingTime(prev => prev + 1);
}, 1000);
} else {
setRecordingTime(0);
}
return () => clearInterval(interval);
}, [isRecording]);
// Simulated tip of the day rotation
useEffect(() => {
const tips = [
'Regular grooming not only keeps your pet looking good but also promotes bonding and allows you to check for any health issues.',
'Dogs need mental stimulation as well as physical exercise. Try puzzle toys to keep their minds active!',
'Cats typically drink very little water. Consider a pet fountain to encourage hydration.',
'Regular dental care can add years to your pet\'s life. Try introducing tooth brushing gradually.',
'Pets need routine just like humans. Try to feed and walk your pet at the same times each day.'
];
const randomTip = tips[Math.floor(Math.random() * tips.length)];
setTipOfTheDay(randomTip);
}, []);
const handleRecord = () => {
if (!isRecording) {
setIsRecording(true);
// Simulate recording for 3 seconds then show result
setTimeout(() => {
setIsRecording(false);
setTranslationResult({
mood: 'Excited',
translation: 'I want to play outside! Let\'s go for a walk!',
confidence: 87
});
}, 3000);
} else {
setIsRecording(false);
}
};
const handleAssistantSubmit = useCallback(async () => {
if (assistantMessage.trim() === '') return;
// Add user message to chat
setAssistantChat(prev => [...prev, {sender: 'user', message: assistantMessage}]);
// Store the message to clear input field
const message = assistantMessage;
setAssistantMessage('');
// Show loading indicator
setIsAssistantLoading(true);
try {
// Call ChatGPT API
const response = await fetch('https://api.openai.com/v1/chat/completions', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': 'Bearer YOUR_OPENAI_API_KEY' // Replace with your actual API key
},
body: JSON.stringify({
model: 'gpt-3.5-turbo',
messages: [
{
role: 'system',
content: 'You are an AI pet assistant specializing in dog care, particularly for Golden Retrievers. Provide helpful, accurate, and concise advice about pet health, training, nutrition, and behavior. Your responses should be friendly and supportive to pet owners. Keep responses under 150 words.'
},
{
role: 'user',
content: message
}
],
max_tokens: 150
})
});
const data = await response.json();
// Hide loading indicator
setIsAssistantLoading(false);
if (data.choices && data.choices.length > 0) {
setAssistantChat(prev => [...prev, {
sender: 'assistant',
message: data.choices[0].message.content
}]);
} else {
throw new Error('No response from ChatGPT API');
}
} catch (error) {
console.error('Error calling ChatGPT API:', error);
// Hide loading indicator
setIsAssistantLoading(false);
// Fallback response in case of API failure
let fallbackResponse = '';
if (message.toLowerCase().includes('food') || message.toLowerCase().includes('eat')) {
fallbackResponse = 'For a Golden Retriever puppy, it\'s recommended to feed them high-quality puppy food specifically formulated for large breeds. At 1 year old, they typically need about 2-3 cups of food per day, divided into two meals.';
} else if (message.toLowerCase().includes('walk') || message.toLowerCase().includes('exercise')) {
fallbackResponse = 'Golden Retriever puppies need about 5 minutes of exercise per month of age, up to twice a day. At 15 months, that\'s about 75 minutes daily. Be careful not to over-exercise as their joints are still developing.';
} else if (message.toLowerCase().includes('train') || message.toLowerCase().includes('behavior')) {
fallbackResponse = 'Golden Retrievers respond well to positive reinforcement training. They\'re eager to please and intelligent. Short, consistent training sessions with treats and praise work best. Start with basic commands like sit, stay, and come.';
} else {
fallbackResponse = 'That\'s a great question about your pet! Golden Retrievers are known for their friendly temperament and intelligence. Would you like specific advice about training, health, nutrition, or grooming for your puppy?';
}
setAssistantChat(prev => [...prev, {sender: 'assistant', message: fallbackResponse}]);
}
}, [assistantMessage]);
const handleAddActivity = () => {
// Validate form
if (newActivity.description.trim() === '') return;
// Create new activity log
const now = new Date();
const timeString = `Today, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
let description = newActivity.description;
if (newActivity.type === 'food' && newActivity.amount) {
description = `${newActivity.amount} of ${newActivity.description}`;
} else if ((newActivity.type === 'walk' || newActivity.type === 'play') && newActivity.duration) {
description = `${newActivity.duration} min ${newActivity.description}`;
}
const newLog = {
type: newActivity.type,
time: timeString,
description: description
};
// Add to activity logs
setActivityLogs(prev => [newLog, ...prev]);
// Reset form and close modal
setNewActivity({
type: 'food',
description: '',
duration: '',
amount: ''
});
setShowNewActivityModal(false);
};
const formatTime = (seconds: number) => {
const mins = Math.floor(seconds / 60);
const secs = seconds % 60;
return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
const renderHome = () => (
<div className="pb-20 pt-16">
<div className="bg-white rounded-lg shadow-md p-4 mx-4 mb-4 flex items-center">
<div className="w-16 h-16 rounded-full overflow-hidden mr-4">
<img
src="https://public.readdy.ai/ai/img_res/3426ca311c3f8d88b693af3a48bc912c.jpg"
alt="Pet"
className="w-full h-full object-cover object-top"
/>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<div>
<h2 className="text-xl font-semibold">{petName}</h2>
<p className="text-gray-600">{petType} • 1 year, 3 months</p>
<div className="flex items-center mt-1">
<span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Healthy</span>
<span className="text-sm text-gray-500 ml-2">18.5 lbs</span>
</div>
</div>
{wearableConnected && (
<div className="flex flex-col items-end">
<div className="flex items-center text-green-600 mb-1">
<i className="fas fa-circle text-xs mr-1"></i>
<span className="text-xs font-medium">Connected</span>
</div>
<div className="flex items-center">
<div className="flex flex-col items-end mr-3">
<span className="text-sm font-semibold">{wearableData.heartRate}</span>
<span className="text-xs text-gray-500">BPM</span>
</div>
<div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
<i className="fas fa-heartbeat text-red-500"></i>
</div>
</div>
</div>
)}
</div>
</div>
</div>
<div className="mx-4 mb-6">
<div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
<div className="flex items-start">
<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
<i className="fas fa-lightbulb text-indigo-600"></i>
</div>
<div>
<h3 className="font-semibold text-indigo-800 mb-1">Tip of the Day</h3>
<p className="text-gray-700 text-sm">{tipOfTheDay}</p>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-3 gap-4 mx-4 mb-6">
<button
className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg p-4 flex flex-col items-center cursor-pointer !rounded-button"
onClick={() => setActiveTab('healthCheck')}
>
<i className="fas fa-stethoscope text-2xl mb-2"></i>
<span className="font-medium">Health Check</span>
</button>
<button
className="bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg p-4 flex flex-col items-center cursor-pointer !rounded-button"
onClick={() => setActiveTab('wearables')}
>
<i className="fas fa-heartbeat text-2xl mb-2"></i>
<span className="font-medium">Wearables</span>
</button>
<button
className="bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg p-4 flex flex-col items-center cursor-pointer !rounded-button"
onClick={() => setActiveTab('translator')}
>
<i className="fas fa-language text-2xl mb-2"></i>
<span className="font-medium">Translate</span>
</button>
<button
className="bg-green-100 hover:bg-green-200 text-green-800 rounded-lg p-4 flex flex-col items-center cursor-pointer !rounded-button"
onClick={() => setShowNewActivityModal(true)}
>
<i className="fas fa-paw text-2xl mb-2"></i>
<span className="font-medium">Log Activity</span>
</button>
<button
className="bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-lg p-4 flex flex-col items-center cursor-pointer !rounded-button"
onClick={() => setShowAssistantModal(true)}
>
<i className="fas fa-robot text-2xl mb-2"></i>
<span className="font-medium">AI Assistant</span>
</button>
<button
className="bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg p-4 flex flex-col items-center cursor-pointer !rounded-button"
onClick={() => setActiveTab('petAR')}
>
<i className="fas fa-camera-retro text-2xl mb-2"></i>
<span className="font-medium">Pet AR</span>
</button>
</div>
{/* Pet Store Search */}
<div className="mx-4 mb-4">
<div className="relative">
<input
type="text"
placeholder="Search for pet medicines, food, accessories..."
className="w-full bg-gray-100 rounded-full py-3 px-5 pr-12 text-sm border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
<button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 cursor-pointer">
<i className="fas fa-search"></i>
</button>
</div>
</div>
{/* Pet Store Categories */}
<div className="mx-4 mb-6">
<h3 className="font-semibold text-lg mb-3">Shop by Category</h3>
<div className="grid grid-cols-4 gap-3">
{shopCategories.slice(0, 4).map((category) => (
<div key={category.id} className="flex flex-col items-center">
<div className="w-14 h-14 rounded-full overflow-hidden mb-1">
<img
src={category.image}
alt={category.name}
className="w-full h-full object-cover"
/>
</div>
<span className="text-xs text-center white-space-nowrap overflow-hidden text-overflow-ellipsis">{category.name}</span>
</div>
))}
</div>
</div>
{/* Popular Medicines */}
<div className="mx-4 mb-6">
<div className="flex justify-between items-center mb-3">
<h3 className="font-semibold text-lg">Popular Medicines</h3>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
View All
</button>
</div>
<div className="bg-white rounded-lg shadow-sm p-4 mb-4">
<div className="grid grid-cols-3 gap-4">
<div className="flex flex-col items-center">
<div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
<img
src="https://readdy.ai/api/search-image?query=Dog medicine bottle of antibiotics with a golden retriever on the label, professional product photography, clean white background, high detail quality, centered composition, subject fills 80 percent of frame&width=150&height=150&seq=23&orientation=squarish"
alt="PetAmox"
className="w-full h-full object-cover"
/>
</div>
<h4 className="font-medium text-sm">PetAmox</h4>
<p className="text-xs text-gray-500">Antibiotics</p>
<div className="flex justify-between items-center w-full mt-1">
<span className="font-bold text-sm">$24.99</span>
<button
className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 cursor-pointer"
onClick={() => {
setSelectedProduct({
name: "PetAmox",
price: "$24.99",
category: "Antibiotics",
quantity: 1
});
setShowAddToCartModal(true);
}}
>
<i className="fas fa-plus text-xs"></i>
</button>
</div>
</div>
<div className="flex flex-col items-center">
<div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
<img
src="https://readdy.ai/api/search-image?query=Dog medicine bottle of anti-inflammatory medication, professional product photography, clean white background, high detail quality, centered composition, subject fills 80 percent of frame&width=150&height=150&seq=24&orientation=squarish"
alt="PetRelief"
className="w-full h-full object-cover"
/>
</div>
<h4 className="font-medium text-sm">PetRelief</h4>
<p className="text-xs text-gray-500">Anti-inflammatory</p>
<div className="flex justify-between items-center w-full mt-1">
<span className="font-bold text-sm">$19.99</span>
<button
className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 cursor-pointer"
onClick={() => {
setSelectedProduct({
name: "PetRelief",
price: "$19.99",
category: "Anti-inflammatory",
quantity: 1
});
setShowAddToCartModal(true);
}}
>
<i className="fas fa-plus text-xs"></i>
</button>
</div>
</div>
<div className="flex flex-col items-center">
<div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
<img
src="https://readdy.ai/api/search-image?query=Dog flea and tick medicine box, professional product photography, clean white background, high detail quality, centered composition, subject fills 80 percent of frame&width=150&height=150&seq=25&orientation=squarish"
alt="FleaGuard"
className="w-full h-full object-cover"
/>
</div>
<h4 className="font-medium text-sm">FleaGuard</h4>
<p className="text-xs text-gray-500">Flea & Tick</p>
<div className="flex justify-between items-center w-full mt-1">
<span className="font-bold text-sm">$32.99</span>
<button
className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 cursor-pointer"
onClick={() => {
setSelectedProduct({
name: "FleaGuard",
price: "$32.99",
category: "Flea & Tick",
quantity: 1
});
setShowAddToCartModal(true);
}}
>
<i className="fas fa-plus text-xs"></i>
</button>
</div>
</div>
</div>
</div>
</div>
<div className="mx-4 mb-6">
<div className="flex justify-between items-center mb-3">
<h3 className="font-semibold text-lg">Pet Care Essentials</h3>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
View All
</button>
</div>
<div className="bg-white rounded-lg shadow-sm p-4 mb-4">
<div className="grid grid-cols-2 gap-4">
<div className="flex flex-col items-center">
<div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
<img
src="https://readdy.ai/api/search-image?query=Premium dog food bag, balanced nutrition, professional product photography, clean white background, high detail quality, centered composition, subject fills 80 percent of frame&width=150&height=150&seq=26&orientation=squarish"
alt="Premium Dog Food"
className="w-full h-full object-cover"
/>
</div>
<h4 className="font-medium text-sm">Premium Dog Food</h4>
<p className="text-xs text-gray-500">Balanced Nutrition</p>
<div className="flex justify-between items-center w-full mt-1">
<span className="font-bold text-sm">$45.99</span>
<button
className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 cursor-pointer"
onClick={() => {
setSelectedProduct({
name: "Premium Dog Food",
price: "$45.99",
category: "Pet Food",
quantity: 1
});
setShowAddToCartModal(true);
}}
>
<i className="fas fa-plus text-xs"></i>
</button>
</div>
</div>
<div className="flex flex-col items-center">
<div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
<img
src="https://readdy.ai/api/search-image?query=Smart pet collar with health monitoring features, professional product photography, clean white background, high detail quality, centered composition, subject fills 80 percent of frame&width=150&height=150&seq=29&orientation=squarish"
alt="PetPal Smart Collar"
className="w-full h-full object-cover"
/>
</div>
<h4 className="font-medium text-sm">PetPal Smart Collar</h4>
<p className="text-xs text-gray-500">Health Monitoring</p>
<div className="flex justify-between items-center w-full mt-1">
<span className="font-bold text-sm">$89.99</span>
<button
className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 cursor-pointer"
onClick={() => {
setSelectedProduct({
name: "PetPal Smart Collar",
price: "$89.99",
category: "Accessories",
quantity: 1
});
setShowAddToCartModal(true);
}}
>
<i className="fas fa-plus text-xs"></i>
</button>
</div>
</div>
</div>
</div>
<div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
<div className="flex justify-between items-center mb-2">
<h3 className="font-semibold">Daily Streak</h3>
<span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">{streak} days</span>
</div>
<div className="flex justify-between">
{[1, 2, 3, 4, 5, 6, 7].map((day) => (
<div key={day} className="flex flex-col items-center">
<div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${day <= streak ? 'bg-white text-indigo-600' : 'bg-white bg-opacity-20'}`}>
<i className={`fas ${day <= streak ? 'fa-check' : 'fa-paw'}`}></i>
</div>
<span className="text-xs">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][day - 1]}</span>
</div>
))}
</div>
</div>
</div>
<div className="mx-4 mb-4">
<div className="flex justify-between items-center mb-3">
<h3 className="font-semibold text-lg">Recent Activity</h3>
<button
className="text-indigo-600 text-sm font-medium cursor-pointer"
onClick={() => setShowNewActivityModal(true)}
>
<i className="fas fa-plus mr-1"></i> Add
</button>
</div>
{activityLogs.map((activity, index) => (
<div key={index} className="bg-white rounded-lg shadow-sm p-4 mb-3">
<div className="flex items-center">
<div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3
${activity.type === 'food' ? 'bg-green-100' : ''}
${activity.type === 'walk' ? 'bg-blue-100' : ''}
${activity.type === 'translation' ? 'bg-purple-100' : ''}
${activity.type === 'play' ? 'bg-yellow-100' : ''}
${activity.type === 'medication' ? 'bg-red-100' : ''}
`}>
<i className={`
${activity.type === 'food' ? 'fas fa-bone text-green-600' : ''}
${activity.type === 'walk' ? 'fas fa-walking text-blue-600' : ''}
${activity.type === 'translation' ? 'fas fa-language text-purple-600' : ''}
${activity.type === 'play' ? 'fas fa-baseball-ball text-yellow-600' : ''}
${activity.type === 'medication' ? 'fas fa-pills text-red-600' : ''}
`}></i>
</div>
<div>
<h4 className="font-medium">{activity.description}</h4>
<p className="text-sm text-gray-500">{activity.time}</p>
</div>
</div>
</div>
))}
</div>
<div className="mx-4 mb-6">
<h3 className="font-semibold text-lg mb-3">Upcoming</h3>
<div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
<div className="flex justify-between items-center">
<div>
<h4 className="font-medium">Vaccination Due</h4>
<p className="text-sm text-gray-500">In 5 days</p>
</div>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
Schedule
</button>
</div>
</div>
</div>
<div className="fixed bottom-20 right-4">
<button
className="bg-indigo-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg cursor-pointer !rounded-button"
onClick={() => setShowAssistantModal(true)}
>
<i className="fas fa-comment-dots text-xl"></i>
</button>
</div>
</div>
);
const renderHealth = () => (
<div className="pb-20 pt-16">
<div className="mx-4 mb-4">
<div className="relative">
<input
type="text"
placeholder="Describe symptoms or ask a question..."
className="w-full bg-gray-100 rounded-full py-3 px-5 pr-12 text-sm border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
<button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 cursor-pointer">
<i className="fas fa-search"></i>
</button>
</div>
</div>
<div className="mx-4 mb-6">
<h3 className="font-semibold text-sm text-gray-500 mb-2">COMMON ISSUES</h3>
<div className="flex flex-wrap gap-2">
<button className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
Digestive
</button>
<button className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
Skin & Coat
</button>
<button className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
Behavior
</button>
<button className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm cursor-pointer hover:bg-gray-50">
Allergies
</button>
</div>
</div>
<div className="mx-4 mb-4">
<div className="bg-white rounded-lg shadow-sm p-4 mb-3">
<h3 className="font-semibold mb-2">AI Health Assistant</h3>
<p className="text-gray-600 text-sm">
Ask me about your pet's symptoms, behavior changes, or general health questions. I can help assess urgency and suggest next steps.
</p>
<div className="flex flex-wrap gap-2 mt-3">
<button className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-indigo-200 !rounded-button">
<i className="fas fa-camera mr-1"></i> Upload Photo
</button>
<button className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-indigo-200 !rounded-button">
<i className="fas fa-microphone mr-1"></i> Voice Input
</button>
<button className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-indigo-200 !rounded-button">
<i className="fas fa-list-ul mr-1"></i> Symptom Checker
</button>
</div>
</div>
</div>
<div className="mx-4 mb-4">
<div className="bg-gray-100 rounded-lg p-4">
<div className="flex items-start mb-4">
<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
<i className="fas fa-robot text-indigo-600 text-sm"></i>
</div>
<div className="bg-white rounded-lg p-3 shadow-sm">
<p className="text-gray-800">
Hello! How can I help with your pet's health today?
</p>
</div>
</div>
<div className="flex items-start mb-4 flex-row-reverse">
<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-3 flex-shrink-0">
<i className="fas fa-user text-gray-600 text-sm"></i>
</div>
<div className="bg-indigo-500 rounded-lg p-3 shadow-sm">
<p className="text-white">
My dog has been scratching a lot lately and has a red spot on his belly.
</p>
</div>
</div>
<div className="flex items-start mb-4">
<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
<i className="fas fa-robot text-indigo-600 text-sm"></i>
</div>
<div className="bg-white rounded-lg p-3 shadow-sm">
<div className="flex justify-between items-center mb-2">
<span className="font-medium text-indigo-800">AI Vet Assessment</span>
<span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">
87% confidence
</span>
</div>
<p className="text-gray-800 mb-2">
I'm sorry to hear about your dog's discomfort. Excessive scratching and red spots could indicate several issues:
</p>
<ul className="list-disc list-inside text-gray-800 mb-2 text-sm">
<li>Allergies (environmental or food)</li>
<li>Fleas or other parasites</li>
<li>Skin infection</li>
<li>Hot spot developing</li>
</ul>
<div className="bg-gray-50 p-2 rounded-lg mb-2">
<div className="flex items-center mb-1">
<span className="font-medium text-sm">Urgency Level:</span>
</div>
<div className="flex items-center">
<div className="w-1/3 h-2 rounded-l-full bg-green-500"></div>
<div className="w-1/3 h-2 bg-yellow-500"></div>
<div className="w-1/3 h-2 rounded-r-full bg-red-200"></div>
</div>
<div className="flex justify-between text-xs mt-1">
<span>Mild</span>
<span className="font-medium text-yellow-600">Moderate</span>
<span>Emergency</span>
</div>
</div>
<p className="text-gray-800 text-sm">
Would you like some home care suggestions while monitoring, or information about when a vet visit is recommended?
</p>
</div>
</div>
<div className="flex gap-2 mb-4">
<button className="bg-white text-indigo-600 border border-indigo-200 rounded-full px-4 py-2 text-sm flex-1 cursor-pointer hover:bg-indigo-50 !rounded-button">
Home care tips
</button>
<button className="bg-white text-indigo-600 border border-indigo-200 rounded-full px-4 py-2 text-sm flex-1 cursor-pointer hover:bg-indigo-50 !rounded-button">
When to see a vet
</button>
</div>
<div className="flex gap-2 mb-4">
<button
className="bg-white text-indigo-600 border border-indigo-200 rounded-full px-4 py-2 text-sm flex-1 cursor-pointer hover:bg-indigo-50 !rounded-button"
onClick={() => {
setShowMedicineModal(true);
}}
>
<i className="fas fa-pills mr-1"></i> Medicine options
</button>
<button className="bg-red-500 text-white rounded-full px-4 py-2 text-sm flex-1 cursor-pointer hover:bg-red-600 !rounded-button">
<i className="fas fa-phone-alt mr-1"></i> Talk to a Live Vet
</button>
</div>
</div>
</div>
<div className="fixed bottom-20 right-4">
<button className="bg-red-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg cursor-pointer !rounded-button">
<i className="fas fa-first-aid text-xl"></i>
</button>
</div>
</div>
);
const renderTranslator = () => (
<div className="pb-20 pt-16">
<div className="mx-4 mb-6">
<div className="bg-white rounded-lg shadow-md p-5 text-center">
<h2 className="text-xl font-semibold mb-2">Pet Translator</h2>
<p className="text-gray-600 mb-4">Record your pet's sounds to translate what they're trying to tell you!</p>
<div className="mb-6">
<button
onClick={handleRecord}
className={`w-24 h-24 rounded-full flex items-center justify-center shadow-md mx-auto cursor-pointer !rounded-button ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-indigo-600'}`}
>
<i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'} text-white text-3xl`}></i>
</button>
{isRecording && (
<div className="mt-2 text-gray-600">
<div className="flex justify-center items-center gap-1">
<div className="w-1 h-3 bg-indigo-600 animate-pulse"></div>
<div className="w-1 h-5 bg-indigo-600 animate-pulse delay-75"></div>
<div className="w-1 h-8 bg-indigo-600 animate-pulse delay-100"></div>
<div className="w-1 h-4 bg-indigo-600 animate-pulse delay-150"></div>
<div className="w-1 h-6 bg-indigo-600 animate-pulse delay-200"></div>
<div className="w-1 h-2 bg-indigo-600 animate-pulse delay-300"></div>
</div>
<p className="mt-1">{formatTime(recordingTime)}</p>
</div>
)}
</div>
{translationResult && (
<div className="bg-indigo-50 rounded-lg p-4">
<div className="flex justify-between items-center mb-2">
<span className="font-medium text-indigo-800">Translation Result</span>
<span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">
{translationResult.confidence}% confidence
</span>
</div>
<div className="bg-white rounded-lg p-4 shadow-sm mb-3">
<div className="flex items-center mb-2">
<i className="fas fa-smile text-yellow-500 mr-2"></i>
<span className="font-medium">Mood: {translationResult.mood}</span>
</div>
<p className="text-gray-800">"{translationResult.translation}"</p>
</div>
<div className="flex gap-2">
<button className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm flex-1 cursor-pointer !rounded-button">
<i className="fas fa-share-alt mr-1"></i> Share
</button>
<button className="bg-white text-indigo-600 border border-indigo-200 rounded-lg px-4 py-2 text-sm flex-1 cursor-pointer !rounded-button">
<i className="fas fa-save mr-1"></i> Save
</button>
</div>
</div>
)}
</div>
</div>
<div className="mx-4 mb-6">
<h3 className="font-semibold text-lg mb-3">Recent Translations</h3>
<div className="bg-white rounded-lg shadow-sm p-4 mb-3">
<div className="flex justify-between items-center mb-1">
<h4 className="font-medium">Yesterday, 5:30 PM</h4>
<span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Playful</span>
</div>
<p className="text-gray-800">"Let's play! Throw the ball for me!"</p>
</div>
<div className="bg-white rounded-lg shadow-sm p-4 mb-3">
<div className="flex justify-between items-center mb-1">
<h4 className="font-medium">April 2, 2:15 PM</h4>
<span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Happy</span>
</div>
<p className="text-gray-800">"I'm so excited you're home! I missed you!"</p>
</div>
<div className="bg-white rounded-lg shadow-sm p-4">
<div className="flex justify-between items-center mb-1">
<h4 className="font-medium">April 1, 7:45 AM</h4>
<span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">Hungry</span>
</div>
<p className="text-gray-800">"Breakfast time! I'm starving!"</p>
</div>
</div>
<div className="mx-4">
<div className="flex justify-between items-center mb-3">
<h3 className="font-semibold text-lg">Custom Dictionary</h3>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
<i className="fas fa-plus mr-1"></i> Add
</button>
</div>
<div className="bg-white rounded-lg shadow-sm p-4 mb-3">
<div className="flex justify-between items-center">
<div>
<h4 className="font-medium">Short bark + tail wag</h4>
<p className="text-sm text-gray-500">"Time for a walk!"</p>
</div>
<button className="text-gray-400 cursor-pointer">
<i className="fas fa-edit"></i>
</button>
</div>
</div>
<div className="bg-white rounded-lg shadow-sm p-4">
<div className="flex justify-between items-center">
<div>
<h4 className="font-medium">Paw on leg + whine</h4>
<p className="text-sm text-gray-500">"I need attention please"</p>
</div>
<button className="text-gray-400 cursor-pointer">
<i className="fas fa-edit"></i>
</button>
</div>
</div>
</div>
</div>
);
const renderHealthCheck = () => {
const handleSymptomToggle = (symptom: string) => {
setHealthCheckData(prev => {
if (prev.symptoms.includes(symptom)) {
return {
...prev,
symptoms: prev.symptoms.filter(s => s !== symptom)
};
} else {
return {
...prev,
symptoms: [...prev.symptoms, symptom]
};
}
});
};
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
const { name, value } = e.target;
setHealthCheckData(prev => ({
...prev,
[name]: value
}));
};
const handleBodyScoreChange = (score: number) => {
setHealthCheckData(prev => ({
...prev,
bodyConditionScore: score
}));
};
const handleAddPhoto = () => {
// Simulate adding a photo
const newPhoto = "https://public.readdy.ai/ai/img_res/dc388e8fcf50a44a4efba74fd3f526c7.jpg";
setHealthCheckData(prev => ({
...prev,
concernPhotos: [...prev.concernPhotos, newPhoto]
}));
};
const handleSaveHealthCheck = () => {
// Save health check data to records
alert("Health check saved to records!");
setActiveTab('home');
};
const renderStepOne = () => (
<div className="mx-4">
<h3 className="font-semibold text-lg mb-3">Symptom Checker</h3>
<p className="text-gray-600 mb-4">Select any symptoms your pet is experiencing:</p>
<div className="grid grid-cols-2 gap-3 mb-6">
{['Vomiting', 'Diarrhea', 'Lethargy', 'Loss of appetite', 'Coughing', 'Sneezing', 'Limping', 'Scratching'].map(symptom => (
<button
key={symptom}
className={`p-3 rounded-lg text-left ${healthCheckData.symptoms.includes(symptom) ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-white border border-gray-200'}`}
onClick={() => handleSymptomToggle(symptom)}
>
<div className="flex items-center">
<div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${healthCheckData.symptoms.includes(symptom) ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}>
{healthCheckData.symptoms.includes(symptom) && <i className="fas fa-check text-xs"></i>}
</div>
<span>{symptom}</span>
</div>
</button>
))}
</div>
<div className="mb-6">
<h4 className="font-medium mb-2">Symptom Duration</h4>
<div className="flex gap-2">
<button className="flex-1 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Today</button>
<button className="flex-1 py-2 bg-indigo-100 border border-indigo-300 rounded-lg text-indigo-800">1-2 days</button>
<button className="flex-1 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">3+ days</button>
</div>
</div>
<div className="mb-6">
<h4 className="font-medium mb-2">Notes</h4>
<textarea
name="notes"
value={healthCheckData.notes}
onChange={handleInputChange}
className="w-full p-3 border border-gray-200 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
placeholder="Add any additional details about your pet's symptoms..."
></textarea>
</div>
<button
className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium !rounded-button"
onClick={() => setHealthCheckStep(2)}
>
Next: Vital Signs
</button>
</div>
);
const renderStepTwo = () => (
<div className="mx-4">
<h3 className="font-semibold text-lg mb-3">Vital Signs</h3>
<p className="text-gray-600 mb-4">Record your pet's vital signs if you're able to measure them:</p>
<div className="bg-white rounded-lg shadow-sm p-4 mb-4">
<div className="mb-4">
<label className="block text-gray-700 mb-2 font-medium">Temperature (°F)</label>
<input
type="text"
name="temperature"
value={healthCheckData.temperature}
onChange={handleInputChange}
className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
placeholder="e.g., 101.5"
/>
<p className="text-xs text-gray-500 mt-1">Normal range for dogs: 101-102.5°F</p>
</div>
<div className="mb-4">
<label className="block text-gray-700 mb-2 font-medium">Heart Rate (BPM)</label>
<input
type="text"
name="heartRate"
value={healthCheckData.heartRate}
onChange={handleInputChange}
className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
placeholder="e.g., 90"
/>
<p className="text-xs text-gray-500 mt-1">Normal range for dogs: 60-140 BPM</p>
</div>
<div>
<label className="block text-gray-700 mb-2 font-medium">Respiration Rate (breaths/min)</label>
<input
type="text"
name="respirationRate"
value={healthCheckData.respirationRate}
onChange={handleInputChange}
className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
placeholder="e.g., 24"
/>
<p className="text-xs text-gray-500 mt-1">Normal range for dogs: 10-30 breaths/min</p>
</div>
</div>
<div className="flex gap-3 mb-4">
<button
className="flex-1 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 !rounded-button"
onClick={() => setHealthCheckStep(1)}
>
Back
</button>
<button
className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium !rounded-button"
onClick={() => setHealthCheckStep(3)}
>
Next
</button>
</div>
</div>
);
const renderStepThree = () => (
<div className="mx-4">
<h3 className="font-semibold text-lg mb-3">Body Condition Score</h3>
<p className="text-gray-600 mb-4">Assess your pet's body condition on a scale of 1-5:</p>
<div className="bg-white rounded-lg shadow-sm p-4 mb-6">
<div className="flex justify-between mb-2">
<span className="text-sm text-gray-500">Underweight</span>
<span className="text-sm text-gray-500">Ideal</span>
<span className="text-sm text-gray-500">Overweight</span>
</div>
<div className="flex justify-between mb-4">
{[1, 2, 3, 4, 5].map(score => (
<button
key={score}
className={`w-12 h-12 rounded-full flex items-center justify-center ${healthCheckData.bodyConditionScore === score ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
onClick={() => handleBodyScoreChange(score)}
>
{score}
</button>
))}
</div>
<div className="bg-gray-50 p-3 rounded-lg">
<h4 className="font-medium mb-1">Score {healthCheckData.bodyConditionScore} means:</h4>
<p className="text-sm text-gray-600">
{healthCheckData.bodyConditionScore === 1 && "Ribs, spine, and hip bones easily visible. No fat layer. Severe abdominal tuck."}
{healthCheckData.bodyConditionScore === 2 && "Ribs easily felt with minimal fat covering. Visible waist when viewed from above."}
{healthCheckData.bodyConditionScore === 3 && "Ribs can be felt but not prominent. Visible waist and abdominal tuck. Ideal weight."}
{healthCheckData.bodyConditionScore === 4 && "Ribs difficult to feel under fat layer. Waist barely visible. Slight abdominal tuck."}
{healthCheckData.bodyConditionScore === 5 && "Ribs not palpable under thick fat layer. No waist. Abdomen may sag or be distended."}
</p>
</div>
</div>
<div className="flex gap-3 mb-4">
<button
className="flex-1 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 !rounded-button"
onClick={() => setHealthCheckStep(2)}
>
Back
</button>
<button
className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium !rounded-button"
onClick={() => setHealthCheckStep(4)}
>
Next
</button>
</div>
</div>
);
const renderStepFour = () => (
<div className="mx-4">
<h3 className="font-semibold text-lg mb-3">Photo Documentation</h3>
<p className="text-gray-600 mb-4">Take photos of any concerning areas (rashes, injuries, etc.):</p>
<div className="grid grid-cols-3 gap-3 mb-6">
{healthCheckData.concernPhotos.map((photo, index) => (
<div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-200">
<img
src={photo}
alt={`Concern area ${index + 1}`}
className="w-full h-full object-cover"
/>
</div>
))}
<button
className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
onClick={handleAddPhoto}
>
<i className="fas fa-camera text-gray-400 text-xl mb-1"></i>
<span className="text-xs text-gray-500">Add Photo</span>
</button>
</div>
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
<div className="flex items-start">
<i className="fas fa-exclamation-circle text-yellow-500 mt-1 mr-3"></i>
<p className="text-sm text-gray-700">
If your pet is showing severe symptoms (difficulty breathing, collapse, severe bleeding, etc.), please seek immediate veterinary care.
</p>
</div>
</div>
<div className="flex gap-3 mb-4">
<button
className="flex-1 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 !rounded-button"
onClick={() => setHealthCheckStep(3)}
>
Back
</button>
<button
className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium !rounded-button"
onClick={handleSaveHealthCheck}
>
Save Health Check
</button>
</div>
</div>
);
return (
<div className="pb-20 pt-16">
<div className="flex items-center justify-between px-4 mb-6">
<button
className="text-gray-600 cursor-pointer"
onClick={() => setActiveTab('home')}
>
<i className="fas fa-arrow-left"></i>
</button>
<h2 className="text-xl font-semibold text-center">Health Check</h2>
<div className="w-6"></div> {/* Empty div for spacing */}
</div>
<div className="flex justify-between px-8 mb-6">
{[1, 2, 3, 4].map(step => (
<div key={step} className="flex flex-col items-center">
<div
className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
step < healthCheckStep ? 'bg-green-500 text-white' :
step === healthCheckStep ? 'bg-indigo-600 text-white' :
'bg-gray-200 text-gray-500'
}`}
>
{step < healthCheckStep ? <i className="fas fa-check text-sm"></i> : step}
</div>
<span className="text-xs text-gray-500">
{step === 1 && "Symptoms"}
{step === 2 && "Vitals"}
{step === 3 && "Body"}
{step === 4 && "Photos"}
</span>
</div>
))}
</div>
{healthCheckStep === 1 && renderStepOne()}
{healthCheckStep === 2 && renderStepTwo()}
{healthCheckStep === 3 && renderStepThree()}
{healthCheckStep === 4 && renderStepFour()}
</div>
);
};
const renderWearables = () => {
const handleConnectWearable = () => {
// Simulate connecting to a wearable device
setWearableConnected(true);
};
const handleDisconnectWearable = () => {
// Simulate disconnecting from a wearable device
setWearableConnected(false);
};
return (
<div className="pb-20 pt-16">
<div className="flex items-center justify-between px-4 mb-6">
<button
className="text-gray-600 cursor-pointer"
onClick={() => setActiveTab('home')}
>
<i className="fas fa-arrow-left"></i>
</button>
<h2 className="text-xl font-semibold text-center">Pet Wearables</h2>
<div className="w-6"></div> {/* Empty div for spacing */}
</div>
{!wearableConnected ? (
<div className="mx-4">
<div className="bg-white rounded-lg shadow-md p-5 text-center mb-6">
<div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
<i className="fas fa-heartbeat text-gray-400 text-4xl"></i>
</div>
<h3 className="text-xl font-semibold mb-2">Connect a Wearable</h3>
<p className="text-gray-600 mb-4">
Monitor your pet's vital signs in real-time with a smart collar or wearable device.
</p>
<button
className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium !rounded-button"
onClick={handleConnectWearable}
>
Connect Device
</button>
</div>
<div className="bg-white rounded-lg shadow-sm p-4 mb-6">
<h3 className="font-semibold mb-3">Compatible Devices</h3>
<div className="flex items-center mb-4 pb-4 border-b border-gray-100">
<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
<i className="fas fa-tag text-blue-600"></i>
</div>
<div>
<h4 className="font-medium">PetPal Smart Collar</h4>
<p className="text-sm text-gray-500">Temperature, heart rate, GPS tracking</p>
</div>
</div>
<div className="flex items-center mb-4 pb-4 border-b border-gray-100">
<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
<i className="fas fa-paw text-green-600"></i>
</div>
<div>
<h4 className="font-medium">FitBark Activity Tracker</h4>
<p className="text-sm text-gray-500">Activity, sleep, calorie tracking</p>
</div>
</div>
<div className="flex items-center">
<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
<i className="fas fa-heartbeat text-purple-600"></i>
</div>
<div>
<h4 className="font-medium">Whistle Health Monitor</h4>
<p className="text-sm text-gray-500">Health metrics, behavior tracking</p>
</div>
</div>
</div>
<div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
<div className="flex items-start">
<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
<i className="fas fa-lightbulb text-indigo-600"></i>
</div>
<div>
<h3 className="font-semibold text-indigo-800 mb-1">Why use a pet wearable?</h3>
<p className="text-gray-700 text-sm">
Pet wearables can help detect health issues early by monitoring vital signs and activity patterns. They're especially useful for pets with chronic conditions or seniors.
</p>
</div>
</div>
</div>
</div>
) : (
<div className="mx-4">
<div className="bg-white rounded-lg shadow-md p-4 mb-6">
<div className="flex justify-between items-center mb-4">
<div className="flex items-center">
<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
<i className="fas fa-check text-green-600"></i>
</div>
<div>
<h3 className="font-semibold">PetPal Smart Collar</h3>
<p className="text-sm text-gray-500">Connected • {wearableData.lastSync}</p>
</div>
</div>
<button
className="text-red-500 text-sm font-medium cursor-pointer"
onClick={handleDisconnectWearable}
>
Disconnect
</button>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="bg-blue-50 rounded-lg p-3">
<div className="flex items-center mb-1">
<i className="fas fa-thermometer-half text-blue-600 mr-2"></i>
<span className="font-medium text-sm">Temperature</span>
</div>
<p className="text-xl font-semibold">{wearableData.temperature}°F</p>
<p className="text-xs text-gray-500">Normal range: 101-102.5°F</p>
</div>
<div className="bg-red-50 rounded-lg p-3">
<div className="flex items-center mb-1">
<i className="fas fa-heartbeat text-red-600 mr-2"></i>
<span className="font-medium text-sm">Heart Rate</span>
</div>
<p className="text-xl font-semibold">{wearableData.heartRate} BPM</p>
<p className="text-xs text-gray-500">Normal range: 60-140 BPM</p>
</div>
<div className="bg-green-50 rounded-lg p-3">
<div className="flex items-center mb-1">
<i className="fas fa-shoe-prints text-green-600 mr-2"></i>
<span className="font-medium text-sm">Steps Today</span>
</div>
<p className="text-xl font-semibold">{wearableData.steps}</p>
<p className="text-xs text-green-600">+12% from yesterday</p>
</div>
<div className="bg-purple-50 rounded-lg p-3">
<div className="flex items-center mb-1">
<i className="fas fa-moon text-purple-600 mr-2"></i>
<span className="font-medium text-sm">Sleep</span>
</div>
<p className="text-xl font-semibold">{wearableData.sleepHours} hrs</p>
<p className="text-xs text-gray-500">Last night</p>
</div>
</div>
</div>
<div className="mb-6">
<div className="flex justify-between items-center mb-3">
<h3 className="font-semibold text-lg">Weekly Trends</h3>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
View All
</button>
</div>
<div className="bg-white rounded-lg shadow-sm p-4">
<h4 className="font-medium mb-3">Heart Rate History</h4>
<div className="h-40 mb-3">
<img
src="https://public.readdy.ai/ai/img_res/1b1b124d5f4e36bed7bc1c7728b3e069.jpg"
alt="Heart rate chart"
className="w-full h-full object-contain"
/>
</div>
<div className="flex justify-between text-xs text-gray-500">
{wearableHistory.slice().reverse().map((day, index) => (
<span key={index}>{day.date}</span>
))}
</div>
</div>
</div>
<div className="mb-6">
<h3 className="font-semibold text-lg mb-3">Health History</h3>
<div className="bg-white rounded-lg shadow-sm p-4">
<div className="overflow-x-auto">
<table className="w-full text-sm">
<thead>
<tr className="border-b border-gray-200">
<th className="text-left py-2 font-medium">Date</th>
<th className="text-right py-2 font-medium">Temp (°F)</th>
<th className="text-right py-2 font-medium">HR (BPM)</th>
<th className="text-right py-2 font-medium">Steps</th>
</tr>
</thead>
<tbody>
{wearableHistory.map((day, index) => (
<tr key={index} className="border-b border-gray-100">
<td className="py-2">{day.date}</td>
<td className="text-right py-2">{day.temperature}</td>
<td className="text-right py-2">{day.heartRate}</td>
<td className="text-right py-2">{day.steps}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
<div className="flex items-start">
<i className="fas fa-exclamation-circle text-yellow-500 mt-1 mr-3"></i>
<div>
<h4 className="font-medium mb-1">Health Alert</h4>
<p className="text-sm text-gray-700">
Buddy's heart rate was slightly elevated yesterday evening. This could be due to increased activity or excitement. Continue monitoring.
</p>
</div>
</div>
</div>
</div>
)}
</div>
);
};
const renderProfile = () => (
<div className="pb-20 pt-16">
<div className="mx-4 mb-6">
<div className="bg-white rounded-lg shadow-md p-5 text-center">
<div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
<img
src="https://public.readdy.ai/ai/img_res/aba16962d55f6fa6ac9d455fcc75f1f8.jpg"
alt="Pet"
className="w-full h-full object-cover object-top"
/>
</div>
<h2 className="text-2xl font-semibold">{petName}</h2>
<p className="text-gray-600 mb-3">{petType} • Golden Retriever • Male</p>
<div className="flex justify-center gap-2 mb-4">
<span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">1 year, 3 months</span>
<span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">18.5 lbs</span>
</div>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
<i className="fas fa-edit mr-1"></i> Edit Profile
</button>
</div>
</div>
<div className="mx-4 mb-6">
<h3 className="font-semibold text-lg mb-3">Dog Growth Tracker</h3>
<div className="bg-white rounded-lg shadow-sm p-4">
<h4 className="font-medium mb-3">Weight History</h4>
<div className="h-40 mb-3">
<img
src="https://public.readdy.ai/ai/img_res/e92a04b11447411898ec64a5a6e40a32.jpg"
alt="Weight chart"
className="w-full h-full object-contain"
/>
</div>
<div className="flex justify-between text-sm text-gray-500">
<span>Dec 2024</span>
<span>Jan 2025</span>
<span>Feb 2025</span>
<span>Mar 2025</span>
<span>Apr 2025</span>
</div>
</div>
</div>
<div className="mx-4 mb-6">
<div className="flex justify-between items-center mb-3">
<h3 className="font-semibold text-lg">Daily Log</h3>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
<i className="fas fa-plus mr-1"></i> Add Entry
</button>
</div>
<div className="bg-white rounded-lg shadow-sm p-4 mb-3">
<div className="flex justify-between items-center mb-2">
<h4 className="font-medium">Today, April 3</h4>
<span className="text-sm text-gray-500">Thursday</span>
</div>
<div className="grid grid-cols-2 gap-3 mb-3">
<div className="bg-blue-50 rounded-lg p-3">
<div className="flex items-center mb-1">
<i className="fas fa-bone text-blue-600 mr-2"></i>
<span className="font-medium text-sm">Food</span>
</div>
<p className="text-xs text-gray-600">2 cups dry food</p>
<p className="text-xs text-gray-600">½ cup wet food</p>
</div>
<div className="bg-green-50 rounded-lg p-3">
<div className="flex items-center mb-1">
<i className="fas fa-walking text-green-600 mr-2"></i>
<span className="font-medium text-sm">Activity</span>
</div>
<p className="text-xs text-gray-600">30 min morning walk</p>
<p className="text-xs text-gray-600">15 min play time</p>
</div>
<div className="bg-purple-50 rounded-lg p-3">
<div className="flex items-center mb-1">
<i className="fas fa-poop text-purple-600 mr-2"></i>
<span className="font-medium text-sm">Bathroom</span>
</div>
<p className="text-xs text-gray-600">Normal, 3 times</p>
</div>
<div className="bg-yellow-50 rounded-lg p-3">
<div className="flex items-center mb-1">
<i className="fas fa-smile text-yellow-600 mr-2"></i>
<span className="font-medium text-sm">Mood</span>
</div>
<p className="text-xs text-gray-600">Happy, energetic</p>
</div>
</div>
<div className="bg-gray-50 rounded-lg p-3">
<div className="flex items-center mb-1">
<i className="fas fa-notes-medical text-gray-600 mr-2"></i>
<span className="font-medium text-sm">Notes</span>
</div>
<p className="text-xs text-gray-600">Buddy seemed a bit itchy after the walk. Will monitor for any skin issues.</p>
</div>
</div>
<div className="bg-white rounded-lg shadow-sm p-4">
<div className="flex justify-between items-center">
<h4 className="font-medium">Yesterday, April 2</h4>
<button className="text-gray-400 cursor-pointer">
<i className="fas fa-chevron-down"></i>
</button>
</div>
</div>
</div>
<div className="mx-4 mb-6">
<h3 className="font-semibold text-lg mb-3">Photo Gallery</h3>
<div className="grid grid-cols-3 gap-2">
<div className="aspect-square rounded-lg overflow-hidden">
<img
src="https://public.readdy.ai/ai/img_res/6e920c75dcf9847be2b63785b3737336.jpg"
alt="Pet photo"
className="w-full h-full object-cover"
/>
</div>
<div className="aspect-square rounded-lg overflow-hidden">
<img
src="https://public.readdy.ai/ai/img_res/550d039fb1fdc4e987310d0cba9543fa.jpg"
alt="Pet photo"
className="w-full h-full object-cover"
/>
</div>
<div className="aspect-square rounded-lg overflow-hidden">
<img
src="https://public.readdy.ai/ai/img_res/0b71d1af39523c0eafc7d3c9d60eb3e4.jpg"
alt="Pet photo"
className="w-full h-full object-cover"
/>
</div>
<div className="aspect-square rounded-lg overflow-hidden">
<img
src="https://public.readdy.ai/ai/img_res/4775b91749f4f768815aedfccd27d2a1.jpg"
alt="Pet photo"
className="w-full h-full object-cover"
/>
</div>
<div className="aspect-square rounded-lg overflow-hidden">
<img
src="https://public.readdy.ai/ai/img_res/0a12c90c4c968e3b3b9dee213ab70581.jpg"
alt="Pet photo"
className="w-full h-full object-cover"
/>
</div>
<div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer">
<i className="fas fa-plus text-gray-400 text-xl"></i>
</div>
</div>
</div>
<div className="mx-4">
<div className="flex justify-between items-center mb-3">
<h3 className="font-semibold text-lg">Health Records</h3>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
<i className="fas fa-plus mr-1"></i> Add
</button>
</div>
<div className="bg-white rounded-lg shadow-sm p-4 mb-3">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
<i className="fas fa-syringe text-blue-600"></i>
</div>
<div>
<h4 className="font-medium">Vaccination: DHPP</h4>
<p className="text-sm text-gray-500">March 5, 2025</p>
</div>
</div>
</div>
<div className="bg-white rounded-lg shadow-sm p-4">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
<i className="fas fa-pills text-green-600"></i>
</div>
<div>
<h4 className="font-medium">Deworming</h4>
<p className="text-sm text-gray-500">February 15, 2025</p>
</div>
</div>
</div>
</div>
</div>
);
const renderShop = () => {
const filteredProducts = searchQuery
? shopProducts.filter(product =>
product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
)
: selectedCategory
? shopProducts.filter(product => product.category === selectedCategory)
: shopProducts;
return (
<div className="pb-20 pt-16">
<div className="mx-4 mb-4">
<div className="relative">
<input
type="text"
placeholder="Search for pet products..."
className="w-full bg-gray-100 rounded-full py-3 px-5 pr-12 text-sm border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
<button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 cursor-pointer">
<i className="fas fa-search"></i>
</button>
</div>
</div>
<div className="mx-4 mb-6">
<h3 className="font-semibold text-lg mb-3">Shop by Category</h3>
<div className="grid grid-cols-3 gap-3">
{shopCategories.map((category) => (
<div
key={category.id}
className={`flex flex-col items-center p-3 rounded-lg cursor-pointer ${selectedCategory === category.name ? 'bg-indigo-100 border border-indigo-300' : 'bg-white border border-gray-100 shadow-sm'}`}
onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
>
<div className="w-16 h-16 rounded-full overflow-hidden mb-2">
<img
src={category.image}
alt={category.name}
className="w-full h-full object-cover"
/>
</div>
<span className="text-xs text-center font-medium">{category.name}</span>
</div>
))}
</div>
</div>
{selectedCategory && (
<div className="mx-4 mb-4 flex items-center">
<span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
{selectedCategory}
<button
className="ml-2 text-indigo-600"
onClick={() => setSelectedCategory(null)}
>
<i className="fas fa-times-circle"></i>
</button>
</span>
{searchQuery && (
<span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center ml-2">
"{searchQuery}"
<button
className="ml-2 text-gray-600"
onClick={() => setSearchQuery('')}
>
<i className="fas fa-times-circle"></i>
</button>
</span>
)}
</div>
)}
<div className="mx-4 mb-6">
<div className="flex justify-between items-center mb-3">
<h3 className="font-semibold text-lg">Products</h3>
<div className="flex items-center">
<span className="text-sm text-gray-500 mr-2">{filteredProducts.length} items</span>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
<i className="fas fa-sort-amount-down mr-1"></i> Sort
</button>
</div>
</div>
{filteredProducts.length > 0 ? (
<div className="grid grid-cols-2 gap-4">
{filteredProducts.map((product) => (
<div key={product.id} className="bg-white rounded-lg shadow-sm p-3">
<div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
<img
src={product.image}
alt={product.name}
className="w-full h-full object-cover"
/>
</div>
<h4 className="font-medium text-sm">{product.name}</h4>
<p className="text-xs text-gray-500">{product.subcategory}</p>
<div className="flex justify-between items-center w-full mt-2">
<span className="font-bold text-sm">{product.price}</span>
<button
className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 cursor-pointer"
onClick={() => {
setSelectedProduct({
name: product.name,
price: product.price,
category: product.category,
quantity: 1
});
setShowAddToCartModal(true);
}}
>
<i className="fas fa-plus text-xs"></i>
</button>
</div>
</div>
))}
</div>
) : (
<div className="bg-white rounded-lg shadow-sm p-6 text-center">
<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
<i className="fas fa-search text-gray-400 text-xl"></i>
</div>
<h4 className="font-medium mb-1">No products found</h4>
<p className="text-sm text-gray-500 mb-3">Try adjusting your search or filter criteria</p>
<button
className="text-indigo-600 text-sm font-medium"
onClick={() => {
setSearchQuery('');
setSelectedCategory(null);
}}
>
Clear all filters
</button>
</div>
)}
</div>
{cartItems.length > 0 && (
<div className="fixed bottom-20 left-0 right-0 mx-4">
<div className="bg-indigo-600 rounded-lg shadow-lg p-3 flex justify-between items-center">
<div className="text-white">
<span className="font-medium">{cartItems.length} items</span>
<p className="text-xs text-indigo-200">in your cart</p>
</div>
<a href="https://readdy.ai/home/dce94bc1-350b-44d5-8005-1086f0071f57/883c627f-dc11-4beb-bd8c-0594fd46012c" data-readdy="true">
<button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium text-sm !rounded-button">
View Cart
</button>
</a>
</div>
</div>
)}
</div>
);
};
const renderPetAR = () => (
<div className="pb-20 pt-16">
<div className="flex items-center justify-between px-4 mb-6">
<button
className="text-gray-600 cursor-pointer"
onClick={() => setActiveTab('home')}
>
<i className="fas fa-arrow-left"></i>
</button>
<h2 className="text-xl font-semibold text-center">Pet AR</h2>
<div className="w-6"></div> {/* Empty div for spacing */}
</div>
{arMode === 'scan' && (
<div className="mx-4">
<div className="bg-white rounded-lg shadow-md p-5 text-center mb-6">
<h3 className="text-xl font-semibold mb-4">Pet Augmented Reality</h3>
<p className="text-gray-600 mb-6">
Scan your pet to try different grooming styles and accessories using AI-powered AR technology.
</p>
<div className="relative w-full h-64 bg-gray-100 rounded-lg mb-6 overflow-hidden">
<div className="absolute inset-0 flex items-center justify-center">
<div className="w-48 h-48 border-4 border-dashed border-indigo-300 rounded-lg flex items-center justify-center">
<i className="fas fa-dog text-indigo-300 text-5xl"></i>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 text-center text-sm">
Position your pet in the frame
</div>
</div>
<button
className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium !rounded-button"
onClick={() => setArMode('preview')}
>
<i className="fas fa-camera mr-2"></i> Scan Pet
</button>
</div>
<div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 mb-6">
<div className="flex items-start">
<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
<i className="fas fa-lightbulb text-indigo-600"></i>
</div>
<div>
<h3 className="font-semibold text-indigo-800 mb-1">How it works</h3>
<p className="text-gray-700 text-sm">
Our AI technology scans your pet and creates a 3D model to virtually try different grooming styles and accessories. Find the perfect look before visiting the groomer!
</p>
</div>
</div>
</div>
</div>
)}
{arMode === 'preview' && (
<div className="mx-4">
<div className="bg-white rounded-lg shadow-md p-4 mb-6">
<div className="relative w-full h-80 bg-gray-100 rounded-lg mb-4 overflow-hidden">
<div className="absolute inset-0 flex items-center justify-center">
<i className="fas fa-dog text-gray-300 text-6xl"></i>
</div>
<div className="absolute inset-0 flex items-center justify-center">
<div className="w-64 h-64 border-4 border-dashed border-indigo-300 rounded-lg flex items-center justify-center">
<div className="text-center">
<i className="fas fa-spinner fa-spin text-indigo-500 text-3xl mb-2"></i>
<p className="text-indigo-500 font-medium">Processing scan...</p>
</div>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 text-center">
<div className="flex items-center justify-center">
<i className="fas fa-check-circle text-green-400 mr-2"></i>
<span>Pet scan complete!</span>
</div>
</div>
</div>
<div className="flex gap-3">
<button
className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors !rounded-button"
onClick={() => setArMode('scan')}
>
<i className="fas fa-redo mr-1"></i> Rescan
</button>
<button
className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors !rounded-button"
onClick={() => setArMode('styles')}
>
Try Styles <i className="fas fa-arrow-right ml-1"></i>
</button>
</div>
</div>
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
<div className="flex items-start">
<i className="fas fa-info-circle text-yellow-500 mt-1 mr-3"></i>
<p className="text-sm text-gray-700">
Our AI has created a 3D model of your pet. Now you can try different grooming styles and accessories!
</p>
</div>
</div>
</div>
)}
{arMode === 'styles' && (
<div className="mx-4">
<div className="bg-white rounded-lg shadow-md p-4 mb-6">
<div className="relative w-full h-80 bg-gray-100 rounded-lg mb-4 overflow-hidden">
{selectedStyle ? (
<img
src={selectedStyle}
alt="Pet with style applied"
className="w-full h-full object-contain"
/>
) : (
<div className="absolute inset-0 flex items-center justify-center">
<i className="fas fa-dog text-gray-300 text-6xl"></i>
</div>
)}
</div>
<div className="flex justify-between mb-4">
<button
className={`px-4 py-2 rounded-lg font-medium ${selectedStyle ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'} !rounded-button`}
disabled={!selectedStyle}
onClick={() => {
if (selectedStyle) {
// Save style logic would go here
alert("Style saved to your favorites!");
}
}}
>
<i className="fas fa-heart mr-1"></i> Save Look
</button>
<button
className={`px-4 py-2 rounded-lg font-medium ${selectedStyle ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'} !rounded-button`}
disabled={!selectedStyle}
onClick={() => {
if (selectedStyle) {
// Share style logic would go here
alert("Sharing options opened!");
}
}}
>
<i className="fas fa-share-alt mr-1"></i> Share
</button>
</div>
</div>
<div className="mb-6">
<h3 className="font-semibold text-lg mb-3">Grooming Styles</h3>
<div className="grid grid-cols-2 gap-3">
{petStyles.map(style => (
<div
key={style.id}
className={`bg-white rounded-lg p-2 shadow-sm cursor-pointer ${selectedStyle === style.image ? 'border-2 border-indigo-500' : ''}`}
onClick={() => setSelectedStyle(style.image)}
>
<div className="aspect-square rounded-lg overflow-hidden mb-2">
<img
src={style.image}
alt={style.name}
className="w-full h-full object-cover"
/>
</div>
<p className="text-center font-medium text-sm">{style.name}</p>
</div>
))}
</div>
</div>
<div className="mb-6">
<h3 className="font-semibold text-lg mb-3">Accessories</h3>
<div className="grid grid-cols-2 gap-3">
{petAccessories.map(accessory => (
<div
key={accessory.id}
className={`bg-white rounded-lg p-2 shadow-sm cursor-pointer ${selectedStyle === accessory.image ? 'border-2 border-indigo-500' : ''}`}
onClick={() => setSelectedStyle(accessory.image)}
>
<div className="aspect-square rounded-lg overflow-hidden mb-2">
<img
src={accessory.image}
alt={accessory.name}
className="w-full h-full object-cover"
/>
</div>
<p className="text-center font-medium text-sm">{accessory.name}</p>
</div>
))}
</div>
{selectedStyle && (
<div className="mt-4">
<button
className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors !rounded-button"
onClick={() => {
setShowAddToCartModal(true);
setSelectedProduct({
name: "Pet Accessory",
price: "$19.99",
category: "Accessories",
quantity: 1
});
}}
>
<i className="fas fa-shopping-cart mr-2"></i> Buy This Look
</button>
</div>
)}
</div>
<div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 mb-6">
<div className="flex items-start">
<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
<i className="fas fa-lightbulb text-indigo-600"></i>
</div>
<div>
<h3 className="font-semibold text-indigo-800 mb-1">Pro Tip</h3>
<p className="text-gray-700 text-sm">
Take a screenshot of your favorite styles to show your groomer exactly what you want. You can also book appointments with groomers who use our app for perfect results!
</p>
</div>
</div>
</div>
</div>
)}
</div>
);
return (
<div className="bg-gray-50 min-h-screen relative">
{/* Nav Bar */}
<div className="fixed top-0 left-0 w-full bg-white shadow-sm z-10">
<div className="flex justify-between items-center p-4">
<h1 className="text-xl font-bold text-indigo-600">PetPal AI</h1>
<div className="flex items-center">
<button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 cursor-pointer">
<i className="fas fa-bell text-gray-600"></i>
</button>
<button
className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center cursor-pointer"
onClick={() => setShowPremiumModal(true)}
>
<i className="fas fa-crown text-indigo-600"></i>
</button>
</div>
</div>
</div>
{/* Main Content */}
<div className="pb-16">
{activeTab === 'home' && renderHome()}
{activeTab === 'health' && renderHealth()}
{activeTab === 'translator' && renderTranslator()}
{activeTab === 'profile' && renderProfile()}
{activeTab === 'healthCheck' && renderHealthCheck()}
{activeTab === 'wearables' && renderWearables()}
{activeTab === 'petAR' && renderPetAR()}
{activeTab === 'shop' && renderShop()}
</div>
{/* Tab Bar */}
<div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-10">
<div className="grid grid-cols-5 h-16">
<button
className={`flex flex-col items-center justify-center cursor-pointer ${activeTab === 'home' ? 'text-indigo-600' : 'text-gray-500'}`}
onClick={() => setActiveTab('home')}
>
<i className={`fas fa-home ${activeTab === 'home' ? 'text-indigo-600' : 'text-gray-500'} text-xl mb-1`}></i>
<span className="text-xs">Home</span>
</button>
<button
className={`flex flex-col items-center justify-center cursor-pointer ${activeTab === 'health' ? 'text-indigo-600' : 'text-gray-500'}`}
onClick={() => setActiveTab('health')}
>
<i className={`fas fa-stethoscope ${activeTab === 'health' ? 'text-indigo-600' : 'text-gray-500'} text-xl mb-1`}></i>
<span className="text-xs">Health</span>
</button>
<button
className={`flex flex-col items-center justify-center cursor-pointer`}
onClick={() => setShowNewActivityModal(true)}
>
<div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mb-1 -mt-5 shadow-lg">
<i className="fas fa-plus text-white"></i>
</div>
<span className="text-xs text-gray-500 -mt-1">Log</span>
</button>
<button
className={`flex flex-col items-center justify-center cursor-pointer ${activeTab === 'translator' ? 'text-indigo-600' : 'text-gray-500'}`}
onClick={() => setActiveTab('translator')}
>
<i className={`fas fa-language ${activeTab === 'translator' ? 'text-indigo-600' : 'text-gray-500'} text-xl mb-1`}></i>
<span className="text-xs">Translate</span>
</button>
<button
className={`flex flex-col items-center justify-center cursor-pointer ${activeTab === 'shop' ? 'text-indigo-600' : 'text-gray-500'}`}
onClick={() => setActiveTab('shop')}
>
<i className={`fas fa-shopping-cart ${activeTab === 'shop' ? 'text-indigo-600' : 'text-gray-500'} text-xl mb-1`}></i>
<span className="text-xs">Shop</span>
</button>
</div>
</div>
{/* Premium Subscription Modal */}
{showPremiumModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
<div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
<div className="flex justify-between items-center">
<h2 className="text-xl font-bold">Upgrade to Premium</h2>
<button
onClick={() => setShowPremiumModal(false)}
className="text-white hover:text-gray-200 !rounded-button"
>
<i className="fas fa-times"></i>
</button>
</div>
<p className="mt-1 text-indigo-100">Unlock the full potential of PetPal AI</p>
</div>
<div className="p-4">
<div className="grid gap-4">
{/* Basic Plan */}
<div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
<div className="flex justify-between items-start mb-3">
<div>
<h3 className="font-semibold text-lg">Basic</h3>
<p className="text-gray-500 text-sm">Essential features for pet owners</p>
</div>
<div className="text-right">
<span className="text-xl font-bold">$4.99</span>
<span className="text-gray-500 text-sm">/month</span>
</div>
</div>
<ul className="mb-4 text-sm text-gray-600">
<li className="flex items-center mb-2">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>Unlimited translations</span>
</li>
<li className="flex items-center mb-2">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>Basic health insights</span>
</li>
<li className="flex items-center">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>Ad-free experience</span>
</li>
</ul>
<button
className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg font-medium hover:bg-indigo-200 transition-colors !rounded-button"
onClick={() => {
setShowPremiumModal(false);
setShowSubscriptionConfirmation(true);
}}
>
Subscribe
</button>
</div>
{/* Pro Plan */}
<div className="border-2 border-indigo-500 rounded-lg p-4 relative">
<div className="absolute -top-3 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium">
POPULAR
</div>
<div className="flex justify-between items-start mb-3">
<div>
<h3 className="font-semibold text-lg">Pro</h3>
<p className="text-gray-500 text-sm">Advanced features for dedicated pet parents</p>
</div>
<div className="text-right">
<span className="text-xl font-bold">$9.99</span>
<span className="text-gray-500 text-sm">/month</span>
</div>
</div>
<ul className="mb-4 text-sm text-gray-600">
<li className="flex items-center mb-2">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>All Basic features</span>
</li>
<li className="flex items-center mb-2">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>Advanced health monitoring</span>
</li>
<li className="flex items-center mb-2">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>Personalized diet recommendations</span>
</li>
<li className="flex items-center">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>Priority customer support</span>
</li>
</ul>
<button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors !rounded-button">
Subscribe
</button>
</div>
{/* Premium Plan */}
<div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
<div className="flex justify-between items-start mb-3">
<div>
<h3 className="font-semibold text-lg">Premium</h3>
<p className="text-gray-500 text-sm">Ultimate experience for your pet</p>
</div>
<div className="text-right">
<span className="text-xl font-bold">$14.99</span>
<span className="text-gray-500 text-sm">/month</span>
</div>
</div>
<ul className="mb-4 text-sm text-gray-600">
<li className="flex items-center mb-2">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>All Pro features</span>
</li>
<li className="flex items-center mb-2">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>Vet video consultations (2/month)</span>
</li>
<li className="flex items-center mb-2">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>Emergency assistance 24/7</span>
</li>
<li className="flex items-center">
<i className="fas fa-check text-green-500 mr-2"></i>
<span>Family account (up to 5 pets)</span>
</li>
</ul>
<button
className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg font-medium hover:bg-indigo-200 transition-colors !rounded-button"
onClick={() => {
setShowPremiumModal(false);
setShowSubscriptionConfirmation(true);
}}
>
Subscribe
</button>
</div>
</div>
<button
onClick={() => setShowPremiumModal(false)}
className="w-full text-gray-500 mt-4 py-2 text-sm !rounded-button"
>
Maybe later
</button>
</div>
</div>
</div>
)}
{/* Subscription Confirmation Modal */}
{showSubscriptionConfirmation && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
<div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
<div className="flex justify-between items-center">
<h2 className="text-xl font-bold">Confirm Subscription</h2>
<button
onClick={() => setShowSubscriptionConfirmation(false)}
className="text-white hover:text-gray-200 !rounded-button"
>
<i className="fas fa-times"></i>
</button>
</div>
</div>
<div className="p-4">
<div className="mb-4">
<h3 className="font-semibold text-lg mb-2">Plan Summary</h3>
<div className="bg-gray-50 rounded-lg p-4">
<div className="flex justify-between items-center mb-2">
<span className="font-medium">{selectedPlan.name} Plan</span>
<span className="font-bold">{selectedPlan.price}<span className="text-gray-500 text-sm">/month</span></span>
</div>
<ul className="text-sm text-gray-600 mb-2">
{selectedPlan.features.map((feature, index) => (
<li key={index} className="flex items-center mb-1">
<i className="fas fa-check text-green-500 mr-2 text-xs"></i>
<span>{feature}</span>
</li>
))}
</ul>
<div className="text-xs text-gray-500 mt-2">
Your subscription will renew automatically each month. You can cancel anytime.
</div>
</div>
</div>
<div className="mb-4">
<h3 className="font-semibold text-lg mb-2">Payment Method</h3>
<div className="grid grid-cols-2 gap-2 mb-3">
<button className="border border-gray-200 rounded-lg p-3 flex items-center justify-center bg-indigo-50 border-indigo-300">
<i className="fab fa-cc-visa text-indigo-600 mr-2"></i>
<span>Credit Card</span>
</button>
<button className="border border-gray-200 rounded-lg p-3 flex items-center justify-center">
<i className="fab fa-paypal text-blue-600 mr-2"></i>
<span>PayPal</span>
</button>
</div>
<div className="border border-gray-200 rounded-lg p-3">
<div className="mb-3">
<label className="block text-gray-700 text-sm mb-1">Card Number</label>
<input
type="text"
placeholder="1234 5678 9012 3456"
className="w-full p-2 border border-gray-300 rounded text-sm"
/>
</div>
<div className="grid grid-cols-2 gap-3">
<div>
<label className="block text-gray-700 text-sm mb-1">Expiry Date</label>
<input
type="text"
placeholder="MM/YY"
className="w-full p-2 border border-gray-300 rounded text-sm"
/>
</div>
<div>
<label className="block text-gray-700 text-sm mb-1">CVC</label>
<input
type="text"
placeholder="123"
className="w-full p-2 border border-gray-300 rounded text-sm"
/>
</div>
</div>
</div>
</div>
<div className="mb-4">
<div className="flex items-start">
<input type="checkbox" className="mt-1 mr-2" id="terms" />
<label htmlFor="terms" className="text-sm text-gray-600">
I agree to the <span className="text-indigo-600">Terms of Service</span> and <span className="text-indigo-600">Privacy Policy</span>
</label>
</div>
</div>
<div className="flex gap-3">
<button
className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors !rounded-button"
onClick={() => {
setShowSubscriptionConfirmation(false);
// Here you would typically handle the actual subscription process
// For now, we'll just show a success message
alert(`Thank you for subscribing to the ${selectedPlan.name} plan!`);
}}
>
Confirm Purchase
</button>
<button
className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors !rounded-button"
onClick={() => {
setShowSubscriptionConfirmation(false);
setShowPremiumModal(true);
}}
>
Cancel
</button>
</div>
</div>
</div>
</div>
)}
{/* AI Assistant Modal */}
{showAssistantModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden flex flex-col h-[80vh]">
<div className="bg-indigo-600 p-4 text-white">
<div className="flex justify-between items-center">
<h2 className="text-xl font-bold">AI Pet Assistant</h2>
<button
onClick={() => setShowAssistantModal(false)}
className="text-white hover:text-gray-200 !rounded-button"
>
<i className="fas fa-times"></i>
</button>
</div>
<p className="mt-1 text-indigo-100">Ask me anything about your pet!</p>
</div>
<div className="flex-1 overflow-y-auto p-4 bg-gray-50">
{assistantChat.map((chat, index) => (
<div key={index} className={`flex items-start mb-4 ${chat.sender === 'user' ? 'flex-row-reverse' : ''}`}>
<div className={`w-8 h-8 rounded-full flex items-center justify-center ${chat.sender === 'user' ? 'ml-3 bg-gray-200' : 'mr-3 bg-indigo-100'} flex-shrink-0`}>
<i className={`${chat.sender === 'user' ? 'fas fa-user text-gray-600' : 'fas fa-robot text-indigo-600'} text-sm`}></i>
</div>
<div className={`rounded-lg p-3 shadow-sm ${chat.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'}`}>
<p>{chat.message}</p>
</div>
</div>
))}
{isAssistantLoading && (
<div className="flex items-start mb-4">
<div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-indigo-100 flex-shrink-0">
<i className="fas fa-robot text-indigo-600 text-sm"></i>
</div>
<div className="rounded-lg p-3 shadow-sm bg-white text-gray-800">
<div className="flex space-x-2">
<div className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce"></div>
<div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-100"></div>
<div className="w-2 h-2 rounded-full bg-indigo-700 animate-bounce delay-200"></div>
</div>
</div>
</div>
)}
</div>
<div className="p-4 border-t border-gray-200">
<div className="flex">
<input
type="text"
value={assistantMessage}
onChange={(e) => setAssistantMessage(e.target.value)}
placeholder="Ask about your pet..."
className="flex-1 bg-gray-100 rounded-l-full py-3 px-4 text-sm border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
onKeyPress={(e) => e.key === 'Enter' && handleAssistantSubmit()}
disabled={isAssistantLoading}
/>
<button
className={`${isAssistantLoading ? 'bg-indigo-400' : 'bg-indigo-600'} text-white rounded-r-full px-4 cursor-pointer !rounded-button`}
onClick={handleAssistantSubmit}
disabled={isAssistantLoading}
>
<i className={`fas ${isAssistantLoading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
</button>
</div>
<div className="flex flex-wrap gap-2 mt-3">
<button
className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-gray-200"
onClick={() => setAssistantMessage("What training tips do you have for a Golden Retriever puppy?")}
disabled={isAssistantLoading}
>
Training tips
</button>
<button
className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-gray-200"
onClick={() => setAssistantMessage("What should I feed my 1-year-old Golden Retriever?")}
disabled={isAssistantLoading}
>
Diet advice
</button>
<button
className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-gray-200"
onClick={() => setAssistantMessage("What common health issues should I watch for in Golden Retrievers?")}
disabled={isAssistantLoading}
>
Health concerns
</button>
<button
className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-gray-200"
onClick={() => setAssistantMessage("How much exercise does my Golden Retriever puppy need?")}
disabled={isAssistantLoading}
>
Exercise needs
</button>
</div>
</div>
</div>
</div>
)}
{/* Medicine Options Modal */}
{showMedicineModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden max-h-[90vh]">
<div className="bg-indigo-600 p-4 text-white">
<div className="flex justify-between items-center">
<h2 className="text-xl font-bold">Medication Options for Skin Issues</h2>
<button
onClick={() => setShowMedicineModal(false)}
className="text-white hover:text-gray-200 !rounded-button"
>
<i className="fas fa-times"></i>
</button>
</div>
</div>
<div className="p-4 overflow-y-auto">
<div className="mb-4">
<h3 className="font-semibold text-lg mb-2">Over-the-Counter Options</h3>
<div className="bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 border-blue-500">
<div className="flex justify-between">
<h4 className="font-medium">Antihistamines</h4>
<span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Mild</span>
</div>
<p className="text-sm text-gray-600 my-2">Helps reduce itching and inflammation caused by allergies. Common options include Benadryl (diphenhydramine) and Zyrtec (cetirizine).</p>
<div className="text-xs text-gray-500 mb-2">
<p><span className="font-medium">Dosage:</span> 1mg per pound of body weight, 2-3 times daily</p>
<p><span className="font-medium">Side effects:</span> Drowsiness, dry mouth, urinary retention</p>
</div>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
Learn More
</button>
</div>
<div className="bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 border-green-500">
<div className="flex justify-between">
<h4 className="font-medium">Medicated Shampoos</h4>
<span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Gentle</span>
</div>
<p className="text-sm text-gray-600 my-2">Specially formulated shampoos with ingredients like chlorhexidine, miconazole, or oatmeal to soothe irritated skin and treat infections.</p>
<div className="text-xs text-gray-500 mb-2">
<p><span className="font-medium">Usage:</span> Bathe once every 3-7 days until improvement</p>
<p><span className="font-medium">Side effects:</span> Minimal; possible dryness with overuse</p>
</div>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
Learn More
</button>
</div>
<div className="bg-white rounded-lg shadow-sm p-4 mb-5 border-l-4 border-purple-500">
<div className="flex justify-between">
<h4 className="font-medium">Topical Creams & Sprays</h4>
<span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">Targeted</span>
</div>
<p className="text-sm text-gray-600 my-2">Products containing hydrocortisone (1%) can help reduce inflammation and itching in localized areas.</p>
<div className="text-xs text-gray-500 mb-2">
<p><span className="font-medium">Usage:</span> Apply to affected areas 2-3 times daily for up to 7 days</p>
<p><span className="font-medium">Side effects:</span> Skin thinning with prolonged use; keep pet from licking treated areas</p>
</div>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
Learn More
</button>
</div>
</div>
<div className="mb-4">
<h3 className="font-semibold text-lg mb-2">Prescription Options</h3>
<div className="bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 border-yellow-500">
<div className="flex justify-between">
<h4 className="font-medium">Apoquel (Oclacitinib)</h4>
<span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">Prescription</span>
</div>
<p className="text-sm text-gray-600 my-2">Fast-acting medication that targets the itch pathway to provide relief from allergic dermatitis.</p>
<div className="text-xs text-gray-500 mb-2">
<p><span className="font-medium">Dosage:</span> Based on weight, typically twice daily for 14 days, then once daily</p>
<p><span className="font-medium">Side effects:</span> Vomiting, diarrhea, lethargy, increased susceptibility to infection</p>
</div>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
Learn More
</button>
</div>
<div className="bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 border-red-500">
<div className="flex justify-between">
<h4 className="font-medium">Prednisone/Prednisolone</h4>
<span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs">Strong</span>
</div>
<p className="text-sm text-gray-600 my-2">Corticosteroids that reduce inflammation and suppress immune response. Used for moderate to severe allergic reactions.</p>
<div className="text-xs text-gray-500 mb-2">
<p><span className="font-medium">Dosage:</span> Typically starts higher and tapers down; veterinarian prescribed</p>
<p><span className="font-medium">Side effects:</span> Increased thirst/urination, increased appetite, panting, potential long-term effects</p>
</div>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
Learn More
</button>
</div>
<div className="bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 border-indigo-500">
<div className="flex justify-between">
<h4 className="font-medium">Cytopoint Injection</h4>
<span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">Long-lasting</span>
</div>
<p className="text-sm text-gray-600 my-2">Monoclonal antibody therapy that targets and neutralizes the protein that triggers itching. Single injection provides 4-8 weeks of relief.</p>
<div className="text-xs text-gray-500 mb-2">
<p><span className="font-medium">Administration:</span> In-clinic injection every 4-8 weeks as needed</p>
<p><span className="font-medium">Side effects:</span> Minimal; generally very safe with few side effects</p>
</div>
<button className="text-indigo-600 text-sm font-medium cursor-pointer">
Learn More
</button>
</div>
</div>
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
<div className="flex items-start">
<i className="fas fa-exclamation-circle text-yellow-500 mt-1 mr-3"></i>
<p className="text-sm text-gray-700">
Always consult with your veterinarian before starting any medication. Dosages vary based on your pet's weight, age, and specific condition. Never give human medications without veterinary approval.
</p>
</div>
</div>
<button
className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium !rounded-button"
onClick={() => setShowMedicineModal(false)}
>
Close
</button>
</div>
</div>
</div>
)}
{/* Add to Cart Modal */}
{showAddToCartModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
<div className="bg-indigo-600 p-4 text-white">
<div className="flex justify-between items-center">
<h2 className="text-xl font-bold">Add to Cart</h2>
<button
onClick={() => setShowAddToCartModal(false)}
className="text-white hover:text-gray-200 !rounded-button"
>
<i className="fas fa-times"></i>
</button>
</div>
</div>
<div className="p-4">
<div className="mb-4">
<h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
<p className="text-gray-600">{selectedProduct.category}</p>
<p className="text-lg font-bold mt-2">{selectedProduct.price}</p>
</div>
<div className="mb-6">
<label className="block text-gray-700 mb-2 font-medium">Quantity</label>
<div className="flex items-center">
<button
className="bg-gray-200 px-3 py-1 rounded-l-lg !rounded-button"
onClick={() => {
if (selectedProduct.quantity > 1) {
setSelectedProduct({...selectedProduct, quantity: selectedProduct.quantity - 1});
}
}}
>
<i className="fas fa-minus"></i>
</button>
<input
type="text"
className="w-16 text-center py-1 border-t border-b border-gray-200"
value={selectedProduct.quantity}
readOnly
/>
<button
className="bg-gray-200 px-3 py-1 rounded-r-lg !rounded-button"
onClick={() => setSelectedProduct({...selectedProduct, quantity: selectedProduct.quantity + 1})}
>
<i className="fas fa-plus"></i>
</button>
</div>
</div>
<div className="flex gap-3">
<button
className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors !rounded-button"
onClick={() => {
setCartItems([...cartItems, selectedProduct]);
setShowAddToCartModal(false);
setShowAddedNotification(true);
setTimeout(() => setShowAddedNotification(false), 3000);
}}
>
Add to Cart
</button>
<button
className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors !rounded-button"
onClick={() => setShowAddToCartModal(false)}
>
Cancel
</button>
</div>
</div>
</div>
</div>
)}
{/* Added to Cart Notification */}
{showAddedNotification && (
<div className="fixed bottom-20 left-0 right-0 mx-auto w-64 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50 flex items-center justify-center">
<i className="fas fa-check-circle mr-2"></i>
<span>Added to cart!</span>
</div>
)}
{/* New Activity Modal */}
{showNewActivityModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
<div className="bg-indigo-600 p-4 text-white">
<div className="flex justify-between items-center">
<h2 className="text-xl font-bold">Log New Activity</h2>
<button
onClick={() => setShowNewActivityModal(false)}
className="text-white hover:text-gray-200 !rounded-button"
>
<i className="fas fa-times"></i>
</button>
</div>
</div>
<div className="p-4">
<div className="mb-4">
<label className="block text-gray-700 mb-2 font-medium">Activity Type</label>
<div className="grid grid-cols-5 gap-2">
<button
className={`p-3 rounded-lg flex flex-col items-center ${newActivity.type === 'food' ? 'bg-green-100 border border-green-300' : 'bg-gray-100'}`}
onClick={() => setNewActivity({...newActivity, type: 'food'})}
>
<i className="fas fa-bone text-green-600 mb-1"></i>
<span className="text-xs">Food</span>
</button>
<button
className={`p-3 rounded-lg flex flex-col items-center ${newActivity.type === 'walk' ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100'}`}
onClick={() => setNewActivity({...newActivity, type: 'walk'})}
>
<i className="fas fa-walking text-blue-600 mb-1"></i>
<span className="text-xs">Walk</span>
</button>
<button
className={`p-3 rounded-lg flex flex-col items-center ${newActivity.type === 'play' ? 'bg-yellow-100 border border-yellow-300' : 'bg-gray-100'}`}
onClick={() => setNewActivity({...newActivity, type: 'play'})}
>
<i className="fas fa-baseball-ball text-yellow-600 mb-1"></i>
<span className="text-xs">Play</span>
</button>
<button
className={`p-3 rounded-lg flex flex-col items-center ${newActivity.type === 'medication' ? 'bg-red-100 border border-red-300' : 'bg-gray-100'}`}
onClick={() => setNewActivity({...newActivity, type: 'medication'})}
>
<i className="fas fa-pills text-red-600 mb-1"></i>
<span className="text-xs">Meds</span>
</button>
<button
className={`p-3 rounded-lg flex flex-col items-center ${newActivity.type === 'other' ? 'bg-purple-100 border border-purple-300' : 'bg-gray-100'}`}
onClick={() => setNewActivity({...newActivity, type: 'other'})}
>
<i className="fas fa-plus text-purple-600 mb-1"></i>
<span className="text-xs">Other</span>
</button>
</div>
</div>
<div className="mb-4">
<label className="block text-gray-700 mb-2 font-medium">Description</label>
<input
type="text"
value={newActivity.description}
onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
placeholder={newActivity.type === 'food' ? 'What did your pet eat?' :
newActivity.type === 'walk' ? 'Where did you walk?' :
newActivity.type === 'play' ? 'What did you play?' :
newActivity.type === 'medication' ? 'What medication?' : 'Describe the activity'}
className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
</div>
{(newActivity.type === 'food') && (
<div className="mb-4">
<label className="block text-gray-700 mb-2 font-medium">Amount</label>
<input
type="text"
value={newActivity.amount}
onChange={(e) => setNewActivity({...newActivity, amount: e.target.value})}
placeholder="e.g., 1 cup, 1/2 can"
className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
</div>
)}
{(newActivity.type === 'walk' || newActivity.type === 'play') && (
<div className="mb-4">
<label className="block text-gray-700 mb-2 font-medium">Duration (minutes)</label>
<input
type="text"
value={newActivity.duration}
onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
placeholder="e.g., 30"
className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
</div>
)}
<button
className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium !rounded-button"
onClick={handleAddActivity}
>
Save Activity
</button>
</div>
</div>
</div>
)}
</div>
);
};
export default App
