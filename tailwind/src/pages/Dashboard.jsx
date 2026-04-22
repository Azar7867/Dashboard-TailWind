import { useState, useRef, useCallback, useEffect } from "react";
import { ImageIcon, X, Link2, Upload, ZoomIn, ZoomOut, RotateCw, RefreshCw } from "lucide-react";
import Cropper from "react-easy-crop";
import StatsCard from "../components/StatsCard";
import RevenueChart from "../components/RevenueChart";
import TrafficChart from "../components/TrafficChart";
import BikeTable from "../components/BikeTable";
import Activity from "../components/Activity";
import SponsorshipPage from "../components/SponsorshipPage";

// ── Crop helper ───────────────────────────────────────────────────────
function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (e) => reject(e));
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });
}

async function getCroppedBlob(imageSrc, cropBox, containerSize, rotation = 0) {
  const image = await createImage(imageSrc);

  // Scale factors from display container to real image pixels
  const scaleX = image.naturalWidth  / containerSize.width;
  const scaleY = image.naturalHeight / containerSize.height;

  const pixelX = cropBox.x * scaleX;
  const pixelY = cropBox.y * scaleY;
  const pixelW = cropBox.w * scaleX;
  const pixelH = cropBox.h * scaleY;

  const canvas = document.createElement("canvas");
  canvas.width  = pixelW;
  canvas.height = pixelH;
  const ctx = canvas.getContext("2d");

  if (rotation !== 0) {
    ctx.translate(pixelW / 2, pixelH / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-pixelW / 2, -pixelH / 2);
  }

  ctx.drawImage(image, pixelX, pixelY, pixelW, pixelH, 0, 0, pixelW, pixelH);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

// ── Free Crop Component ───────────────────────────────────────────────
function FreeCrop({ imageSrc, onConfirm, onCancel }) {
  const containerRef = useRef(null);
  const imgRef       = useRef(null);
  const [imgLoaded, setImgLoaded]   = useState(false);
  const [imgSize, setImgSize]       = useState({ width: 0, height: 0 });

  // cropBox in px relative to the displayed image
  const [box, setBox] = useState({ x: 40, y: 40, w: 200, h: 120 });
  const dragRef = useRef(null); // { type, startX, startY, startBox }

  // Once image loads, init box to center 60% of image
  const handleImgLoad = () => {
    const el = imgRef.current;
    const w  = el.offsetWidth;
    const h  = el.offsetHeight;
    setImgSize({ width: w, height: h });
    setBox({ x: w * 0.1, y: h * 0.1, w: w * 0.8, h: h * 0.8 });
    setImgLoaded(true);
  };

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const MIN = 30;

  const onPointerDown = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = {
      type,
      startX: e.clientX,
      startY: e.clientY,
      startBox: { ...box },
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup",   onPointerUp);
  };

  const onPointerMove = useCallback((e) => {
    if (!dragRef.current) return;
    const { type, startX, startY, startBox } = dragRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const iW = imgSize.width;
    const iH = imgSize.height;
    let { x, y, w, h } = startBox;

    if (type === "move") {
      x = clamp(x + dx, 0, iW - w);
      y = clamp(y + dy, 0, iH - h);
    }
    if (type.includes("e")) { w = clamp(w + dx, MIN, iW - x); }
    if (type.includes("s")) { h = clamp(h + dy, MIN, iH - y); }
    if (type.includes("w")) {
      const nw = clamp(w - dx, MIN, x + w);
      x = clamp(x + dx, 0, x + w - MIN);
      w = nw;
    }
    if (type.includes("n")) {
      const nh = clamp(h - dy, MIN, y + h);
      y = clamp(y + dy, 0, y + h - MIN);
      h = nh;
    }

    setBox({ x, y, w, h });
  }, [imgSize]);

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup",   onPointerUp);
  }, [onPointerMove]);

  useEffect(() => () => {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup",   onPointerUp);
  }, []);

  const handleDone = () => onConfirm(box, imgSize);

  const handleStyle = "w-4 h-4 bg-white border-2 border-indigo-500 rounded-full absolute z-20 touch-none";

  return (
    <div className="bg-[#111] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <button onClick={onCancel} className="text-[13px] text-white/50 hover:text-white transition-colors">
          Cancel
        </button>
        <h2 className="text-[14px] font-semibold text-white tracking-tight">Crop Image</h2>
        <button
          onClick={handleDone}
          className="text-[13px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Done
        </button>
      </div>

      {/* Image + crop overlay */}
      <div
        ref={containerRef}
        className="relative bg-black overflow-hidden select-none"
        style={{ minHeight: 300 }}
      >
        <img
          ref={imgRef}
          src={imageSrc}
          alt="crop"
          onLoad={handleImgLoad}
          className="block w-full object-contain"
          draggable={false}
        />

        {imgLoaded && (
          <>
            {/* Dark overlay outside crop */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ top: 0, left: 0 }}
            >
              <defs>
                <mask id="crop-mask">
                  <rect width="100%" height="100%" fill="white" />
                  <rect x={box.x} y={box.y} width={box.w} height={box.h} fill="black" />
                </mask>
              </defs>
              <rect
                width="100%" height="100%"
                fill="rgba(0,0,0,0.55)"
                mask="url(#crop-mask)"
              />
            </svg>

            {/* Crop border + grid */}
            <div
              className="absolute border-2 border-white z-10"
              style={{ left: box.x, top: box.y, width: box.w, height: box.h, cursor: "move" }}
              onPointerDown={(e) => onPointerDown(e, "move")}
            >
              {/* Grid lines */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "33.33% 33.33%",
              }} />

              {/* Corner handles */}
              {[
                { type: "nw", style: { top: -8,  left: -8,  cursor: "nw-resize" } },
                { type: "ne", style: { top: -8,  right: -8, cursor: "ne-resize" } },
                { type: "sw", style: { bottom: -8, left: -8, cursor: "sw-resize" } },
                { type: "se", style: { bottom: -8, right: -8, cursor: "se-resize" } },
              ].map(({ type, style }) => (
                <div
                  key={type}
                  className={handleStyle}
                  style={style}
                  onPointerDown={(e) => onPointerDown(e, type)}
                />
              ))}

              {/* Edge handles */}
              {[
                { type: "n",  style: { top: -6,    left: "50%", transform: "translateX(-50%)", cursor: "n-resize",  width: 24, height: 12, borderRadius: 6 } },
                { type: "s",  style: { bottom: -6, left: "50%", transform: "translateX(-50%)", cursor: "s-resize",  width: 24, height: 12, borderRadius: 6 } },
                { type: "w",  style: { left: -6,   top: "50%",  transform: "translateY(-50%)", cursor: "w-resize",  width: 12, height: 24, borderRadius: 6 } },
                { type: "e",  style: { right: -6,  top: "50%",  transform: "translateY(-50%)", cursor: "e-resize",  width: 12, height: 24, borderRadius: 6 } },
              ].map(({ type, style }) => (
                <div
                  key={type}
                  className="absolute z-20 bg-white border-2 border-indigo-500 touch-none"
                  style={style}
                  onPointerDown={(e) => onPointerDown(e, type)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Size display */}
      <div className="flex items-center justify-center gap-2 px-5 py-3 border-t border-white/10">
        <span className="text-[11px] text-white/40 font-mono">
          {Math.round(box.w)} × {Math.round(box.h)} px
        </span>
      </div>
    </div>
  );
}

// ── Aspect Cropper (for preset ratios) ───────────────────────────────
const PRESETS = [
  { label: "Free",   value: "free"  },
  { label: "1 : 1",  value: 1 / 1  },
  { label: "4 : 3",  value: 4 / 3  },
  { label: "16 : 9", value: 16 / 9 },
  { label: "3 : 1",  value: 3 / 1  },
];

function AspectCropper({ imageSrc, aspect, onConfirm, onCancel }) {
  const [crop,     setCrop]     = useState({ x: 0, y: 0 });
  const [zoom,     setZoom]     = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onCropComplete = useCallback((_, pixels) => setCroppedAreaPixels(pixels), []);

  const handleDone = async () => {
    if (!croppedAreaPixels) return;
    setUploading(true);
    // Pass pixels directly — caller handles upload
    onConfirm(croppedAreaPixels, rotation);
  };

  return (
    <div className="bg-[#111] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <button onClick={onCancel} className="text-[13px] text-white/50 hover:text-white transition-colors">Cancel</button>
        <h2 className="text-[14px] font-semibold text-white tracking-tight">Crop Image</h2>
        <button
          onClick={handleDone}
          disabled={uploading}
          className="text-[13px] font-semibold text-indigo-400 hover:text-indigo-300 disabled:opacity-40 transition-colors"
        >
          {uploading ? "…" : "Done"}
        </button>
      </div>

      <div className="relative w-full bg-black" style={{ height: 300 }}>
        <Cropper
          image={imageSrc}
          crop={crop} zoom={zoom} rotation={rotation} aspect={aspect}
          onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete}
          style={{
            containerStyle: { background: "#000" },
            cropAreaStyle: {
              border: "2px solid rgba(255,255,255,0.9)",
              boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
              borderRadius: "4px",
            },
          }}
        />
      </div>

      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center gap-3">
          <ZoomOut size={14} className="text-white/40 flex-shrink-0" />
          <input type="range" min={1} max={3} step={0.01} value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 h-[3px] accent-indigo-500 cursor-pointer" />
          <ZoomIn size={14} className="text-white/40 flex-shrink-0" />
          <span className="text-[11px] text-white/30 w-8 text-right">{zoom.toFixed(1)}×</span>
        </div>
        <div className="flex items-center gap-3">
          <RotateCw size={14} className="text-white/40 flex-shrink-0" />
          <input type="range" min={-180} max={180} step={1} value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="flex-1 h-[3px] accent-indigo-500 cursor-pointer" />
          <button onClick={() => setRotation(0)}>
            <RefreshCw size={13} className="text-white/30 hover:text-white/60 transition-colors" />
          </button>
          <span className="text-[11px] text-white/30 w-8 text-right">{rotation}°</span>
        </div>
      </div>
    </div>
  );
}

// ── LogoModal ─────────────────────────────────────────────────────────
function LogoModal({ onClose }) {
  const [tab,       setTab]       = useState("upload");
  const [urlInput,  setUrlInput]  = useState("");
  const [preview,   setPreview]   = useState(null);
  const [error,     setError]     = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  const [rawImage,   setRawImage]   = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [activePreset, setActivePreset] = useState("free");

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("File must be under 5 MB"); return; }
    setError("");
    setRawImage(URL.createObjectURL(file));
    setActivePreset("free");
    setShowCropper(true);
  };

  const uploadBlob = async (blob) => {
    const formData = new FormData();
    formData.append("image", blob, "logo.png");
    const res  = await fetch("http://localhost:5000/api/logo", { method: "POST", body: formData });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Upload failed");
    return data.data.url;
  };

  // Called by FreeCrop
  const handleFreeConfirm = async (box, imgSize) => {
    setUploading(true);
    setError("");
    try {
      const blob = await getCroppedBlob(rawImage, box, imgSize, 0);
      const url  = await uploadBlob(blob);
      setPreview(url);
      setShowCropper(false);
      URL.revokeObjectURL(rawImage);
      setRawImage(null);
      window.dispatchEvent(new CustomEvent("logo-updated", { detail: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Called by AspectCropper
  const handleAspectConfirm = async (pixelCrop, rotation) => {
    setUploading(true);
    setError("");
    try {
      const image = await createImage(rawImage);
      const canvas = document.createElement("canvas");
      const ctx    = canvas.getContext("2d");
      const maxSize  = Math.max(image.width, image.height);
      const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
      canvas.width = canvas.height = safeArea;
      ctx.translate(safeArea / 2, safeArea / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-safeArea / 2, -safeArea / 2);
      ctx.drawImage(image, safeArea / 2 - image.width / 2, safeArea / 2 - image.height / 2);
      const imgData = ctx.getImageData(0, 0, safeArea, safeArea);
      canvas.width  = pixelCrop.width;
      canvas.height = pixelCrop.height;
      ctx.putImageData(imgData,
        Math.round(0 - safeArea / 2 + image.width  * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
      );
      const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
      const url  = await uploadBlob(blob);
      setPreview(url);
      setShowCropper(false);
      URL.revokeObjectURL(rawImage);
      setRawImage(null);
      window.dispatchEvent(new CustomEvent("logo-updated", { detail: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    URL.revokeObjectURL(rawImage);
    setRawImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUrlLoad = () => {
    if (!urlInput.trim()) return;
    setPreview(urlInput.trim());
    setError("");
  };

  const handleApply = () => {
    window.dispatchEvent(new CustomEvent("logo-updated", { detail: preview }));
    onClose();
  };

  // ── Cropper view ──
  if (showCropper) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 gap-3">

        {/* Preset bar */}
        <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] pb-1">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => setActivePreset(p.value)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors
                ${activePreset === p.value
                  ? "bg-indigo-500 text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20"}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {error && <p className="text-[12px] text-red-400">{error}</p>}

        {/* Render correct cropper */}
        {activePreset === "free" ? (
          <FreeCrop
            imageSrc={rawImage}
            onConfirm={handleFreeConfirm}
            onCancel={handleCropCancel}
          />
        ) : (
          <AspectCropper
            imageSrc={rawImage}
            aspect={activePreset}
            onConfirm={handleAspectConfirm}
            onCancel={handleCropCancel}
          />
        )}

        {uploading && (
          <p className="text-[12px] text-indigo-300 animate-pulse">Uploading…</p>
        )}
      </div>
    );
  }

  // ── Normal modal ──
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[15px] font-semibold text-gray-900">Change sidebar logo</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          {[
            { key: "upload", label: "Upload file", Icon: Upload }
            // { key: "url",    label: "From URL",    Icon: Link2  },
          ].map(({ key, label, Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-medium transition-colors
                ${tab === key ? "bg-indigo-50 text-indigo-600 border-2 border-indigo-400" : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100"}`}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {tab === "upload" && (
          <>
            <div onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors mb-4"
            >
              <ImageIcon size={28} className="mx-auto text-gray-300 mb-2" />
              <p className="text-[13px] text-gray-500">Click to upload image</p>
              <p className="text-[11px] text-gray-400 mt-1">PNG, JPG · max 5 MB</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} style={{ display: "none" }} />
          </>
        )}

        {/* {tab === "url" && (
          <div className="flex gap-2 mb-4">
            <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/logo.png"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-indigo-400"
            />
            <button onClick={handleUrlLoad} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 transition-colors">
              Load
            </button>
          </div>
        )} */}

        {error && <p className="text-[12px] text-red-500 mb-3">{error}</p>}

        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-5">
          {preview ? (
            <img src={preview} alt="Preview" onError={() => setError("Could not load image")}
              className="w-10 h-10 rounded-[10px] object-contain bg-white border border-gray-100" />
          ) : (
            <div className="w-10 h-10 rounded-[10px] bg-gray-100 flex items-center justify-center border border-gray-100">
              <ImageIcon size={16} className="text-gray-300" />
            </div>
          )}
          <div>
            <p className="text-[12px] font-medium text-gray-700">Preview</p>
            <p className="text-[11px] text-gray-400">{preview ? "This is how it looks in the sidebar" : "Upload or enter a URL to preview"}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-gray-200 text-[13px] text-gray-500 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleApply} disabled={!preview}
            className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            Apply logo
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors shadow-sm"
        >
          <ImageIcon size={14} /> Change Logo
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Users"     value="12,840"  change="+15%"        />
        <StatsCard title="Revenue"         value="$45,210" change="+8.2%"       />
        <StatsCard title="Active Projects" value="34"      change="+2 projects" />
        <StatsCard title="Pending Tasks"   value="9"       change="-1 task"     />
      </div>
      <div className="space-y-6"><RevenueChart /><TrafficChart /></div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 overflow-x-auto"><BikeTable /></div>
        <div><Activity /></div>
      </div>
      <SponsorshipPage />
      {showModal && <LogoModal onClose={() => setShowModal(false)} />}
    </div>
  );
}