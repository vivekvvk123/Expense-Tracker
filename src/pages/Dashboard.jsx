import React from 'react'
import { useState, useMemo ,useEffect} from 'react'
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,DropdownMenuRadioGroup,DropdownMenuRadioItem} from "@/components/ui/dropdown-menu"
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { parse } from 'postcss'


function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

function ListOrderedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}

function Dashboard() {
  
  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({  
    amount: "",
    category: "",
    description: "",
  })
  const [budget, setBudget] = useState({
    name: "",
    amount: "",
    totalBudget: 0
  })
  const [categoryBudget, setCategoryBudget] = useState({})
  const [totalBudget, setTotalBudget] = useState(0);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("date")
  const [filterCategory, setFilterCategory] = useState("")
  
  const handleInputChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    })
  }


  const handleBudgetInputChange = (e) => {
    setBudget({
      ...budget,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddExpense = async () => {
    if (newExpense.amount && newExpense.category && newExpense.description) {
      try {
        const response = await fetch('http://localhost:5000/api/expenses/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: parseFloat(newExpense.amount),
            category: newExpense.category,
            description: newExpense.description,
            date:new Date().toISOString().slice(0,10)
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to add expense');
        }
        
        const result = await response.json();
        setExpenses([...expenses, result]);
        setNewExpense({
          amount: "",
          category: "",
          description: "",
        });
        fetchExpenses();
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    } else {
      console.error('Expense details are missing.');
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/budgets');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setBudget(data);
      setCategories(data.map((budget) => budget.name));
    } catch (error) {
      console.error('Error fetching budgets:', error);
      setError('Failed to fetch budgets');
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/expenses');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setExpenses(data.reverse());
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Failed to fetch expenses');
    }
  };
  
var a;
  const handleAddBudget = async () => {
    if (budget.name && budget.amount) {
      try {
        const response = await fetch('http://localhost:5000/api/budget', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({name:budget.name, amount:budget.amount, totalBudget: parseFloat(totalBudget)+parseFloat(budget.amount)}),
        });
        // console.log(totalbudget)

        if (!response.ok) throw new Error(`Failed to add budget. Status: ${response.status}`);

        const newBudget = await response.json();
        // console.log('New budget added:', newBudget);

        setTotalBudget(totalBudget + newBudget.amount);
        a=(budget.totalBudget);
        setBudget({ name: '', amount: '' , totalBudget: totalBudget + newBudget.amount});
        setCategories([...categories, newBudget.name]);
        await fetchBudgets();
      } catch (error) {
        console.error('Error adding budget:', error);
      }
    } else {
      console.error('Budget name or amount is missing.');
    }
  };
  
// console.log(totalBudget);
// console.log(budget.totalBudget)
console.log(a)


const handleDeleteExpense = async (id) => {
    // console.log(id);
    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
      });
      // console.log(response)
      if (!response.ok) throw new Error('Failed to delete expense');

      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
    await fetchExpenses();
  };
  

  const sortedExpenses = useMemo(() => {
    let sorted = [...expenses]
    if (sortBy === "amount") {
      sorted.sort((a, b) => a.amount - b.amount)
    } else if (sortBy === "category") {
      sorted.sort((a, b) => a.category.localeCompare(b.category))
    } else {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    if (filterCategory) {
      sorted = sorted.filter((expense) => expense.category === filterCategory)
    }
    return sorted
  }, [expenses, sortBy, filterCategory])
  

  const totalExpenses = useMemo(() => expenses.reduce((total, expense) => total + expense.amount, 0), [expenses])

  const expensesByCategory = useMemo(() =>
      expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
          acc[expense.category] = { total: 0, count: 0 }
        }
        acc[expense.category].total += expense.amount
        acc[expense.category].count += 1
        return acc
      }, {}),
    [expenses],
  )

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  return (
    <div className="flex flex-col min-h-screen background-container">

      
      <main className="flex-1 py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <Card>
            <CardHeader>
              <CardTitle>Add New Expense</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="1"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select id="category" name="category" value={newExpense.category} onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newExpense.description}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddExpense}>Add Expense</Button>
            </CardFooter>
          </Card>



          <Card>
            <CardHeader>
              <CardTitle>Create Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget-name">Budget Name</Label>
                <Input id="budget-name" name="name" value={budget.name} onChange={handleBudgetInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget-amount">Budget Amount</Label>
                <Input
                  id="budget-amount"
                  name="amount"
                  type="number"
                  step="5"
                  value={budget.amount}
                  onChange={handleBudgetInputChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddBudget}>Create Budget</Button>
            </CardFooter>
          </Card>



          <Card>
            <CardHeader>
              <CardTitle>Expense Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {/* {console.log(totalBudget)} */}
                  <div className="text-2xl font-bold">₹{totalBudget.toFixed(2)-totalExpenses}</div>
                  <div className="text-muted-foreground">Total Budget Left</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{expenses.length}</div>
                  <div className="text-muted-foreground">Total Transactions</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-3">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${totalBudget > 0 ? ((totalBudget - totalExpenses) / totalBudget) * 100 : 0}%` }}
                  ></div>
              </div>


              <Separator className="my-6" />
              <div className="grid grid-cols-1 gap-4">
                
              {Object.entries(expensesByCategory).map(([category, { total, count }]) => (
                  <div key={category} className='border border-gray-300 rounded-lg p-2'>
                    <div className="text-xl font-bold">₹{total} / ₹{categoryBudget[category]}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{width:`${total/(categoryBudget[category])*100}%`}}></div>
                    </div>
                    <div className="text-muted-foreground">
                      {category} ({count})
                    </div>
                  </div>
                ))}

              </div>
            </CardContent>
          </Card>



        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Expense History</h2>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ListOrderedIcon className="w-4 h-4" />
                    Sort by: {sortBy}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="category">Category</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <FilterIcon className="w-4 h-4" />
                    {filterCategory || "All Categories"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup value={filterCategory} onValueChange={setFilterCategory}>
                    <DropdownMenuRadioItem value="">All Categories</DropdownMenuRadioItem>
                    <DropdownMenuSeparator />
                    {categories.map((category) => (
                      <DropdownMenuRadioItem key={category} value={category}>
                        {category}
                        </DropdownMenuRadioItem>
                      ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className="text-right">₹{expense.amount}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteExpense(expense._id)}>
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}

export default Dashboard