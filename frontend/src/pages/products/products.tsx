import React from "react";
import { Trash, X, Search, Image as ImageIcon, Plus } from "lucide-react";
import * as lucide from "lucide-react";
import { useQueryClient,useQuery, useMutation } from "@tanstack/react-query";

const Product = () => {
  const icon = React.useRef();
  const form = React.useRef();
  const [src, setSrc] = React.useState(null);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const { data: overviewData, isPending:isOverviewDataFetching, error:overError } = useQuery({
queryKey: ["OverviewData"],
queryFn: async () => {
const res = await fetch(`${import.meta.env.VITE_BACKNED_URL}/api/me`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({category: 0, users:0, })
});

if (!res.ok) throw new Error(res.status);
  const fetchedData = await res.json();
  
  console.log(fetchedData)
 return fetchedData;
 }
 });

  React.useEffect(() => {
    if (overviewData?.products) {
      setFilteredProducts(overviewData.products);
    }
  }, [overviewData]);

  const { mutate: loadData, isPending, error } = useMutation({
    mutationFn: async (createdFormData) => {
      
      console.log(createdFormData)
      
      if (!createdFormData.name || !createdFormData.sales || !createdFormData.price ||
       !createdFormData.imgUrl ||
       !createdFormData.catagory) {
      throw new Error("All fields are required")
      return;
    }
      
      const res = await fetch(`${import.meta.env.VITE_BACKNED_URL}/api/create/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createdFormData),
      });
      const data = await res.json();
      
      setSrc("")
      
      queryClient.invalidateQueries({ queryKey: ["OverviewData"] });
      return data;
    },
  });

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
        method: "POST",
      });
      queryClient.invalidateQueries({ queryKey: ["OverviewData"] });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["OverviewData"] });
    },
  });

  function handleChangeIcon(e) {
    const file = icon.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setSrc(event.target.result);
      reader.readAsDataURL(file);
    }
  }

  function createProducts(e) {
    e.preventDefault();
    const oldForm = form.current;
    const newForm = new FormData(oldForm);

    let createdFormData = {};
    for (let [key, value] of newForm.entries()) {
      createdFormData[key] = value;
    }


    createdFormData["imgUrl"] = src || "";

    loadData(createdFormData);
  }

  function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = overviewData.products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.catagory?.toLowerCase().includes(term) 
    );
    setFilteredProducts(filtered);
  }

  return (
    <>
      <div className="m-5 bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border h-auto border-gray-700">
        <div className="flex justify-between items-center m-5 font-bold">
          <h3>Products</h3>
          <div className="flex gap-2.5 items-center bg-gray-700 p-1 border-2 border-transparent hover:border-indigo-500 rounded-lg">
            <Search />
            <input
              className="bg-gray-700 outline-none p-1 rounded-lg"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="max-h-[360px] overflow-x-auto overflow-y-scroll scrollbar-hide">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                {["Name", "Category", "Price", "Stock", "Sales", "Actions"].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts?.length ? (
        filteredProducts.map((product) => (
          <tr key={product._id}>
        <td className="flex gap-2 px-6 py-4 text-sm text-gray-300 overflow-hidden"><img className="w-[24px] h-[24px] rounded-full"
                    src={product.imgUrl} />{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{product.catagory || "—"}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">₹{product.price || "0"}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{product.stock}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{product.sales || "0"}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-300">
                      <button onClick={() => deleteProduct(product.productId)} className="hover:text-red-500">
                      {isDeleting ? (<lucide.LoaderPinwheel className="animate-spin" color="purple" />) :  (<Trash size={16} />)}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="flex w-full h-full justify-center items-center text-center gap-2.5 text-gray-400 py-6">
                  {isOverviewDataFetching ? (<lucide.LoaderPinwheel className="animate-spin" color="purple" />) : (<><lucide.FileQuestion size={24} color="skyblue" /> No file Found</>)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="p-2.5 flex justify-center w-full bg-blue-800">
            <button onClick={() => setIsModelOpen(true)} className="font-bold">
              Create Product
            </button>
          </div>
        </div>
      </div>

      {isModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60">
          <div className="bg-gray-800 p-5 rounded-xl w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold">New Product</h2>
              <button onClick={() => setIsModelOpen(false)}>
                <X />
              </button>
            </div>
            <form ref={form} onSubmit={createProducts}>
              {[
                {name: "name",
                type: "text",
                Icon: ImageIcon,
                },
                {name: "sales",
                type: "number",
                Icon: ImageIcon,
                },        
                {name: "stock",
                type: "number",
                Icon: ImageIcon,
                },              
                {name: "catagory",
                type: "text",
                Icon: ImageIcon,
                },               
                {name: "price",
                type: "number",
                Icon: ImageIcon,
                }].map((field) => (
                <div
                  key={field.name}
                  className="flex items-center gap-2.5 bg-gray-700 p-2 mb-2 rounded-lg border-2 border-transparent hover:border-indigo-600"
                >
                  <field.Icon />
                  <input
                    name={field.name}
                    placeholder={field.name}
                    type={field.type}
                    className="bg-gray-700 text-white outline-none w-full"
                  />
                </div>
              ))}

              <div className="h-[180px] mt-5 flex justify-center items-center bg-gray-700 p-2 rounded-lg border-2  border-gray-400 hover:border-indigo-600">
                <input ref={icon} type="file" className="hidden" onChange={handleChangeIcon} />
                {src ? (
                  <div className="relative group">
                    <img src={src} className="rounded-lg object-cover max-h-[160px]" />
                    <button
                      type="button"
                      onClick={() => setSrc(null)}
                      className="absolute top-2 left-2 bg-gray-900/40 p-2 rounded-full"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ) : (
                  <button className="flex font-bold text-gray-400" type="button" onClick={() => icon.current.click()}>
                    <Plus /> Upload Image
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                {isPending ? "Creating..." : "Create"}
              </button>
              {error && <p className="text-red-500 mt-2">{error.message}</p>}
            </form>
          </div>
        </div>
      )}
      
      <div>
       <p className="text-red-500">{overError ? overError.error : ""}</p>
      </div>
      
    </>
  );
};

export default Product;
