import { Kernel } from './kernel'
import { BuildInKernel } from './buildInKernel'

/**
 * Creates and returns a new kernel instance.
 */
export function createKernel (): Kernel {
  return new BuildInKernel()
}

// Exporting accessible build-in clasess.
export * from './resolutionOption'

// Exporting interfaces, that define the behavior.
export * from './kernel'
export * from './module'
export * from './servicing-strategies/servicingStrategy'
export * from './delivery-strategies/deliveryStrategy'

// Exporting Errors
import * as errors from './errors/index'
export { errors as Errors }
