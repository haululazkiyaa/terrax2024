"use client";

import { makeTerraxActor } from "@/core/services/actorLocatorService";
import { fileToCanisterBinaryStoreFormat, resizeImage } from "@/core/utils/imageUtilS";
import { AuthClient } from "@dfinity/auth-client";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const images = [
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F1.png?alt=media&token=34513744-e2d2-4c7e-99d2-b95d5da77e0b",
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F2.png?alt=media&token=d4fa1db9-6581-4c1e-b09f-f75daf5ce7ca",
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F3.png?alt=media&token=bc93d2d6-b5e4-4e0e-9a15-d6eff0e6f32e",
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F4.png?alt=media&token=23315c72-a2cb-4b5a-bf37-2752d6fd0f47",
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F5.png?alt=media&token=1c09cf86-ce74-4bfc-99a6-808a5bd5aafe",
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F6.png?alt=media&token=291d92e2-fb1d-43fa-acac-931b948fbb86",
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F7.png?alt=media&token=87618bb2-395b-4be4-b96f-a011e6e3c974",
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F8.png?alt=media&token=fc2602f8-6a84-4ae7-98b2-791fc2ed5ff3",
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F9.png?alt=media&token=2f9875ad-b580-434c-a4c4-bdd86c8e8376",
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F10.png?alt=media&token=db13dfef-bea5-48ac-9165-df3c584c145f",
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F11.png?alt=media&token=8880a120-a102-4fa5-821e-8060da60220c",
  "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2F12.png?alt=media&token=26be7594-14a7-4e72-ad3a-a4d3522f8fd4",
];

const rooms = ["https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2Froom1.png?alt=media&token=687faeb6-84e7-41dd-b997-ad350ebca234", "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2Froom2.png?alt=media&token=2265dc8e-ee32-492f-87f2-1e58b11908b8", "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2Froom3.png?alt=media&token=f792d78d-ed7c-4cdf-8e1c-78ff10428c93", "https://firebasestorage.googleapis.com/v0/b/terrax-de163.appspot.com/o/files%2Fproperties%2Fdummies%2Froom4.png?alt=media&token=fb9aff97-8a94-4789-bf77-00d7a474ce7a"];

const dummyProperties = [
  {
    name: "Modern Oasis Residence",
    description: "Experience contemporary living at its finest with this 4-bedroom masterpiece. This property boasts sleek architecture, a gourmet kitchen, and a lush backyard retreat. The spacious master suite offers a private sanctuary, while the open-concept design creates an inviting atmosphere. Conveniently located near schools and parks, this residence promises a harmonious lifestyle for families. Your dream home awaits - schedule a tour today!",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[0], ...rooms],
    category: {
      used: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Sunset Boulevard, 22 CA",
    latitude: "34.0522",
    longitude: "-118.2437",
  },
  {
    name: "Sunset View Apartments",
    description: "Enjoy breathtaking sunset views from this stylish 2-bedroom apartment. With modern amenities and an open floor plan, this residence is perfect for those seeking comfort and convenience. The master bedroom features panoramic windows, providing a picturesque backdrop. Nestled in a vibrant neighborhood with easy access to dining and entertainment, this is urban living at its best.",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[1], ...rooms],
    category: {
      land: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Maple Street, 8 NY",
    latitude: "37.7749",
    longitude: "-122.4194",
  },
  {
    name: "Tranquil Haven Villa",
    description: "Escape to tranquility in this charming 3-bedroom villa surrounded by lush greenery. The property features a private pool, a gourmet kitchen, and a spacious living area. Each bedroom is designed for comfort, creating a perfect retreat. Located away from the hustle and bustle, this villa offers serenity without compromising on luxury. Your private oasis awaits!",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[2], ...rooms],
    category: {
      new: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Ocean Avenue, 15 FL",
    latitude: "-33.8688",
    longitude: "151.2093",
  },
  {
    name: "Downtown Loft Retreat",
    description: "Immerse yourself in city living with this trendy downtown loft. The industrial-chic design includes exposed brick walls, high ceilings, and large windows, providing an abundance of natural light. The open-layout kitchen and living space make it perfect for entertaining. Live in the heart of the city's vibrant energy - this loft is your stylish urban escape.",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[3], ...rooms],
    category: {
      used: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Main Street, 10 TX",
    latitude: "55.7558",
    longitude: "37.6176",
  },
  {
    name: "Seaside Sanctuary Residence",
    description: "Wake up to the sound of waves in this coastal 3-bedroom residence. With panoramic ocean views, this home offers a seamless blend of indoor and outdoor living. The master suite features a private balcony, inviting you to unwind with breathtaking sunsets. Located steps away from the beach, this property embodies the essence of coastal living.",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[4], ...rooms],
    category: {
      land: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Pine Avenue, 5 AZ",
    latitude: "48.8566",
    longitude: "2.3522",
  },
  {
    name: "Elegant Garden Estate",
    description: "Step into luxury with this 5-bedroom garden estate. The meticulously landscaped grounds surround a stately home with timeless elegance. The interior showcases high-end finishes, a gourmet kitchen, and a grand staircase. Perfect for hosting gatherings, this estate offers sophistication and charm in every detail.",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[5], ...rooms],
    category: {
      new: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Cedar Lane, 18 NV",
    latitude: "35.6895",
    longitude: "139.6917",
  },
  {
    name: "Urban Retreat Penthouse",
    description: "Indulge in luxury with this exquisite 3-bedroom penthouse in the heart of the city. The panoramic city views create a stunning backdrop for the contemporary design and high-end finishes. The expansive living space, private terrace, and upscale amenities make this penthouse a true urban retreat for those who appreciate the finest things in life.",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[6], ...rooms],
    category: {
      used: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Broadway Street, 3 IL",
    latitude: "51.5074",
    longitude: "-0.1278",
  },
  {
    name: "Serenity Heights Condominium",
    description: "Discover a tranquil lifestyle in this 2-bedroom condominium offering breathtaking mountain views. The thoughtfully designed interior features modern furnishings, a state-of-the-art kitchen, and a cozy living area. With proximity to hiking trails and nature reserves, this condominium is perfect for those seeking a balance between luxury and the great outdoors.",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[7], ...rooms],
    category: {
      new: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Lakeview Terrace, 9 GA",
    latitude: "37.7749",
    longitude: "-122.4194",
  },
  {
    name: "Chic City Center Loft",
    description: "Live in style with this chic 1-bedroom loft located in the vibrant city center. The loft's industrial aesthetic is complemented by modern furnishings and exposed brick walls. Ideal for urban professionals, this residence offers a unique blend of sophistication and convenience, with trendy cafes, boutiques, and cultural hotspots just steps away.",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[8], ...rooms],
    category: {
      land: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Forest Lane, 14 OH",
    latitude: "41.8781",
    longitude: "-87.6298",
  },
  {
    name: "Tranquility Lakeside Retreat",
    description: "Escape to tranquility in this lakeside 4-bedroom retreat. The property features a private dock, offering direct access to the serene lake. Inside, the home exudes warmth and comfort with a rustic-chic design. Enjoy picturesque views from the expansive deck or take a leisurely stroll along the lakeside path. This retreat is a perfect blend of nature and luxury living.",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[9], ...rooms],
    category: {
      used: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Mountain View, 7 CO",
    latitude: "34.0522",
    longitude: "-118.2437",
  },
  {
    name: "Metropolitan Vue Apartments",
    description: "Experience city living at its best in these modern 1-bedroom apartments. The sleek design is complemented by upscale finishes and panoramic city views. With a prime location near public transportation and trendy urban hotspots, these apartments offer a stylish and convenient lifestyle for the modern city dweller.",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[10], ...rooms],
    category: {
      land: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Riverfront Road, 11 WA",
    latitude: "40.7128",
    longitude: "-74.0060",
  },
  {
    name: "Harmony Hills Townhomes",
    description: "Embrace the charm of community living with these spacious 3-bedroom townhomes. Nestled in the picturesque Harmony Hills neighborhood, each townhome features a private backyard and easy access to communal green spaces. The classic architecture and modern interiors make these townhomes a perfect choice for families seeking a harmonious blend of comfort and connection.",
    price: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    image: [images[11], ...rooms],
    category: {
      new: null,
    },
    bedroom: Math.floor(Math.random() * 10) + 1,
    bathroom: Math.floor(Math.random() * 10) + 1,
    dining: Math.floor(Math.random() * 10) + 1,
    livingRoom: Math.floor(Math.random() * 10) + 1,
    firstFloor: Math.floor(Math.random() * 10) + 1,
    secondFloor: Math.floor(Math.random() * 10) + 1,
    groundFloor: Math.floor(Math.random() * 10) + 1,
    construtionArea: Math.floor(Math.random() * 10) + 1,
    address: "Highland Avenue, 6 OR",
    latitude: "-6.2088",
    longitude: "106.8456",
  },
];

const Page = () => {
  const ImageMaxWidth = 2048;

  const [imageId, setImageId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [authClient, setAuthClient] = useState(null);

  useEffect(() => {
    async function init() {
      const authClients = await AuthClient.create();
      setAuthClient(authClients);
    }

    init();
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        try {
          const firstFile = acceptedFiles[0];
          const newFile = await resizeImage(firstFile, ImageMaxWidth);
          setFile(newFile);
        } catch (error) {
          console.error(error);
        }
      }
    },
  });

  async function submit() {
    if (file == null) {
      alert("Image null");
      return;
    }

    setLoading(true);
    setImageId(null);

    const idCard = await fileToCanisterBinaryStoreFormat(file);
    const identity = await authClient.getIdentity();

    const terraxActor = makeTerraxActor({ identity });

    const test = await terraxActor.registerUser({
      name: "Indra Mahesa",
      email: "indramahesa128@gmail.com",
      address: "bandung",
      birth: moment().unix(),
      idCard: idCard,
      phone: "081395749832",
    });

    console.log(test);
    // const newImageId = await imageActor.create(fileArray);
    // setImageId(newImageId);

    // setLoading(false);
  }

  async function submitProperti() {
    const identity = await authClient.getIdentity();
    const terraxActor = makeTerraxActor({ identity });

    images.map(async (row, index) => {
      const test = await terraxActor.createProperty(dummyProperties[index]);

      console.log(test);
    });
  }

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  async function login() {
    await authClient.login({
      identityProvider: "http://127.0.0.1:4943/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai",
      onSuccess: () => {
        console.log("Auth Success");
      },
      onError: (err) => {
        console.log("Auth Error", err);
      },
    });
  }

  async function getUser() {
    const identity = await authClient.getIdentity();
    console.log(identity);
    const terraxActor = makeTerraxActor({ identity });

    const test = await terraxActor.getUserByPrincipal();
    console.log(test);
  }

  async function getP() {
    const terraxActor = makeTerraxActor();

    const test = await terraxActor.getProperty({
      category: {
        used: null,
      },
      name: "Indra",
    });
    console.log(test);
  }

  async function getProfile() {
    const identity = await authClient.getIdentity();
    const terraxActor = makeTerraxActor({ identity });
    const test = await terraxActor.getUserByPrincipal();

    console.log(test);
  }

  async function insertProperty() {
    const identity = await authClient.getIdentity();
    const terraxActor = makeTerraxActor({ identity });

    const test = await terraxActor.getUserByPrincipal();
  }

  return (
    <div style={{ height: "100vh" }}>
      <div className="mx-[20rem] pt-[10rem]">
        <button className="border border-sky-500" onClick={login}>
          Login
        </button>
        <br />
        <button className="border border-sky-500" onClick={getProfile}>
          Get Profile
        </button>
        <br />
        <button className="border border-sky-500" onClick={insertProperty}>
          Insert Property
        </button>
        <br />
        <button className="border border-sky-500" onClick={getUser}>
          Get User
        </button>
        <br />
        <button className="border border-sky-500" onClick={getP}>
          Get Propert
        </button>
        <h2>Create User</h2>
        <div action="" className="flex flex-col gap-5">
          <h2>Image</h2>
          <div>
            <label htmlFor="name">Upload Image: &nbsp;</label>
            <button {...getRootProps({ className: "dropzone border border-sky-500" })}>
              Pick a Image
              <input {...getInputProps()} />
            </button>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </div>
          <button onClick={submit}>{"Submit"}</button>
        </div>
        <button onClick={submitProperti}>{"Submit Propertie"}</button>
      </div>
    </div>
  );
};

export default Page;