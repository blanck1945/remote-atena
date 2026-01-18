// src/pages/Stats.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { SafeLink } from "../components/SafeLink/SafeLink";
import type { Bucket } from "../types/bucket";

export function Stats() {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get<Bucket[]>(
          `${import.meta.env.VITE_APPLICATION_URL}/uploadcare/buckets`
        );

        setBuckets(res.data);
      } catch (err: any) {
        console.error(err);
        setError("No se pudieron cargar las estadísticas de los buckets.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuckets();
  }, []);

  const totalFiles = buckets.reduce((sum, bucket) => sum + bucket.totalFiles, 0);

  return (
    <div className="min-h-screen bg-gray-50 mt-8">
      <main className="max-w-5xl mx-auto px-4 pb-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Estadísticas</h1>
          <SafeLink
            to=".."
            className="text-violet-600 hover:text-violet-800 underline"
          >
            Volver a archivos
          </SafeLink>
        </div>

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-gray-600">
            Cargando estadísticas...
          </div>
        ) : (
          <>
            <div className="mb-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Resumen General
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-violet-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total de Buckets</p>
                  <p className="text-3xl font-bold text-violet-700">
                    {buckets.length}
                  </p>
                </div>
                <div className="p-4 bg-violet-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total de Fotos</p>
                  <p className="text-3xl font-bold text-violet-700">
                    {totalFiles}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Estadísticas por Bucket
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {buckets.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No hay buckets disponibles
                  </div>
                ) : (
                  buckets.map((bucket) => (
                    <div
                      key={bucket.name}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {bucket.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-violet-700">
                              {bucket.totalFiles}
                            </p>
                            <p className="text-sm text-gray-500">
                              {bucket.totalFiles === 1 ? "foto" : "fotos"}
                            </p>
                          </div>
                        </div>
                      </div>
                      {totalFiles > 0 && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-violet-600 h-2 rounded-full transition-all"
                              style={{
                                width: `${(bucket.totalFiles / totalFiles) * 100}%`,
                              }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {((bucket.totalFiles / totalFiles) * 100).toFixed(1)}%
                            del total
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

